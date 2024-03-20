import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateCompanyService } from "../../../services/factories/company-services/make-update-company";

export async function updateCompany(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateCompanyBodySchema = z.object({
    userId: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cnpj: z.string(),
    corporate_reason: z.string(),
    fantasy_name: z.string(),
    identification: z.string(),
    cep: z.string(),
    address: z.string(),
    neighborhood: z.string(),
    phone: z.string(),
    dt_start_esocial: z.coerce.date(),
  });

  const updateCompanyParamSchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = updateCompanyParamSchema.parse(request.params);

    const {
      userId,
      cnpj,
      corporate_reason,
      fantasy_name,
      identification,
      cep,
      address,
      neighborhood,
      phone,
      dt_start_esocial,
    } = updateCompanyBodySchema.parse(request.body);

    const updateCompanyService = makeUpdateCompanyService();

    await updateCompanyService.execute({
      id,
      userId,
      cnpj,
      corporate_reason,
      fantasy_name,
      identification,
      cep,
      address,
      neighborhood,
      phone,
      dt_start_esocial,
      active: true,
    });

    return reply.status(200).send({ message: "Company successfully updated." });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
