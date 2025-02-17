import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateCompanyService } from "../../../services/factories/company-factories/make-update-company";
import { customDateSchema } from "../../../../utils/convert-date";

export async function updateCompany(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateCompanyBodySchema = z.object({
    userId: z.string(),
    email: z.string().email(),
    password: z.string().min(6).optional(),
    cnpj: z.string(),
    corporate_reason: z.string(),
    fantasy_name: z.string(),
    identification: z.string(),
    cep: z.string(),
    address: z.string(),
    neighborhood: z.string(),
    phone: z.string(),
    dt_start_esocial: customDateSchema,
  });

  const updateCompanyParamSchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = updateCompanyParamSchema.parse(request.params);

    const {
      userId,
      email,
      password,
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
      email,
      password,
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
