import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllAsoService } from "../../../services/factories/aso-factories/make-fetch-all-asos";

export async function fetchAllAsos(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchAllAsosService = makeFetchAllAsoService();

    const { asos } = await fetchAllAsosService.execute();

    return reply.status(200).send({ asos });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
