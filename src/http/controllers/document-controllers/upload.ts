import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { FastifyRequest } from "fastify";
import { z } from "zod";
import { r2 } from "../../../lib/cloudflare";
import { prisma } from "../../../lib/prisma";

export const uploadDocument = async (request: FastifyRequest) => {
  const uploadBodySchema = z.object({
    name: z.string().min(1),
    contentType: z.string().regex(/\w+\/[-+.\w]+/),
    companyId: z.string(),
    employeeId: z.string(),
    professionalId: z.string()
  });

  const { name, contentType, companyId, employeeId, professionalId } = uploadBodySchema.parse(request.body);

  const fileKey = randomUUID().concat('-').concat(name);

  const signedUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: 'sst-practice-dev',
      Key: fileKey,
      ContentType: contentType,
    }),
    { expiresIn: 600 },
  );

  const file = await prisma.documents.create({
    data: {
      name,
      contentType,
      key: fileKey,
      empresaId: companyId,
      empregadoId: employeeId,
      profissionalId: professionalId
    }
  });

  return { signedUrl, fileId: file.id };
}