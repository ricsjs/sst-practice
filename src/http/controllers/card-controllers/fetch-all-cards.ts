import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllAsoService } from "../../../services/factories/aso-factories/make-fetch-all-asos";
import { z } from "zod";
import { makeFetchAllCardsService } from "../../../services/factories/card-factories/make-fetch-all-cards";

export async function fetchAllCards(request: FastifyRequest, reply: FastifyReply) {
  const fetchAllACardsSchema = z.object({
    companyId: z.string()
  })

  const { companyId } = fetchAllACardsSchema.parse(request.params)

  try {
    const fetchAllCardsService = makeFetchAllCardsService();

    const { cards } = await fetchAllCardsService.execute({ companyId });

    return reply.status(200).send({ cards });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
