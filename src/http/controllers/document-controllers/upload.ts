import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { FastifyRequest } from "fastify";
import { z } from "zod";
import { r2 } from "../../../lib/cloudflare";
import { prisma } from "../../../lib/prisma";
import { resend } from "../../../mail/client";
import { env } from "../../../env";

const generateSignedDownloadUrl = async (
  bucketName: string,
  fileKey: string
) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
  });

  const signedUrl = await getSignedUrl(r2, command, { expiresIn: 14400 }); // URL expira em 1 hora

  return signedUrl;
};

export const uploadDocument = async (request: FastifyRequest) => {
  const uploadBodySchema = z.object({
    name: z.string().min(1),
    contentType: z.string().regex(/\w+\/[-+.\w]+/),
    medicalConfidentiality: z.boolean(),
    companyId: z.string(),
    employeeId: z.string(),
    professionalId: z.string(),
  });

  const { name, contentType, medicalConfidentiality, companyId, employeeId, professionalId } =
    uploadBodySchema.parse(request.body);

  const fileKey = randomUUID().concat("-").concat(name);

  try {
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: "sst-practice-dev",
        Key: fileKey,
        ContentType: contentType,
      }),
      { expiresIn: 600 }
    );

    if (!signedUrl) {
      throw new Error("Signed URL generation failed");
    }

    const file = await prisma.documents.create({
      data: {
        name,
        contentType,
        medicalConfidentiality,
        key: fileKey,
        empresaId: companyId,
        empregadoId: employeeId,
        profissionalId: professionalId,
      },
    });

    const companyName = await prisma.empresa.findUnique({
      where: { id: companyId },
      select: { fantasy_name: true },
    });

    const employeeName = await prisma.empregado.findUnique({
      where: { id: employeeId },
      select: { name: true },
    });

    const professionalName = await prisma.profissional.findUnique({
      where: { id: professionalId },
      select: { name: true },
    });

    const companyUserEmail = await prisma.empresa.findUnique({
      where: { id: companyId },
      select: {
        user: {
          select: { email: true },
        },
      },
    });

    const downloadUrl = await generateSignedDownloadUrl(
      "sst-practice-dev",
      fileKey
    );

    if (companyUserEmail?.user?.email && medicalConfidentiality === false) {
      const { data } = await resend.emails.send({
        from: env.RESEND_EMAIL_SEND,
        to: [companyUserEmail.user.email],
        subject: `Novo documento Cadastrado para ${companyName?.fantasy_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #157a8c;">Novo Documento Cadastrado</h2>
            <p>Prezado(a) Usuário(a),</p>
            <p>Gostaríamos de informar que um novo documento foi cadastrado para sua empresa. Abaixo estão os detalhes:</p>
            <ul>
              <li><strong>Documento:</strong> ${name}</li>
              <li><strong>Cadastrado por:</strong> ${professionalName?.name}</li>
              <li><strong>Referente ao empregado:</strong> ${employeeName?.name}</li>
            </ul>
            <p>Para visualizar o documento, acesse o sistema utilizando o link abaixo:</p>
            <p>
              <a href="sst-practice-front-end.vercel.app" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #157a8c; text-decoration: none; border-radius: 5px;">Acessar Sistema</a>
            </p>
            <p>Ou você pode acessar o documento diretamente pelo link temporário abaixo (expira em 24 horas):</p>
            <p>
              <a href="${downloadUrl}" target="_blank" style="color: #157a8c; text-decoration: underline;">Acessar Documento</a>
            </p>
            <br>
            <p>Atenciosamente,<br>Prática SST</p>
          </div>
        `,
      });

      console.log("E-mail enviado:", data);
    } else {
      console.error("E-mail do usuário da empresa não encontrado.");
    }

    return { signedUrl, fileId: file.id };
  } catch (error) {
    console.error("Erro ao enviar documento:", error);
    throw error;
  }
};