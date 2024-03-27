import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllAsoService } from "../../../services/factories/aso-factories/make-fetch-all-asos";
import { z } from "zod";

export async function fetchAllAsos(request: FastifyRequest, reply: FastifyReply) {
  const fetchAllAsosSchema = z.object({
    companyId: z.string()
  })

  const { companyId } = fetchAllAsosSchema.parse(request.params)

  try {
    const fetchAllAsosService = makeFetchAllAsoService();

    const { asos } = await fetchAllAsosService.execute({ companyId });

    return reply.status(200).send({ asos });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
