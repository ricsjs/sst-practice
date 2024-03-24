import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteCompanyService } from "../../../services/factories/company-factories/make-delete-company-service";

export async function deleteCompany(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteCompanySchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = deleteCompanySchema.parse(request.params);

    const deleteCompanyService = makeDeleteCompanyService();

    await deleteCompanyService.execute({ id });

    return reply.status(200).send({ message: "Company successfully deleted." });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
