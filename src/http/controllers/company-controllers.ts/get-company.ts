import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListCompanyByIdService } from "../../../services/factories/company-services/make-fetch-company-by-id";

export async function getCompany(request: FastifyRequest, reply: FastifyReply) {
  const getCompanySchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = getCompanySchema.parse(request.params);

    const listCompaniesService = makeListCompanyByIdService();

    const { company } = await listCompaniesService.execute({ id });

    return reply.status(200).send({ company });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
