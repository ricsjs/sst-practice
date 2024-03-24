import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllProfessionalsService } from "../../../services/factories/professional-factories/make-fetch-all-professionals";

export async function fetchAllProfessionals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchAllProfessionalsService = makeFetchAllProfessionalsService();

    const { professionals } = await fetchAllProfessionalsService.execute();

    return reply.status(200).send({ professionals });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
