import { FastifyReply, FastifyRequest } from "fastify";
import { makeListCompaniesService } from "../../../services/factories/company-services/make-fetch-all-companies";

export async function listCompanies(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listCompaniesService = makeListCompaniesService();

    const { companies } = await listCompaniesService.execute();

    return reply.status(200).send({ companies });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
