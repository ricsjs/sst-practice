import { FastifyReply, FastifyRequest } from "fastify"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"
import { z } from "zod"
import { makeFetchCardByIdService } from "../../../services/factories/card-factories/make-find-card-by-id"

export async function fetchCardById(request: FastifyRequest, reply: FastifyReply) {
    const fetchCardByIdSchema = z.object({
        id: z.string()
    })

    try {

        const { id } = fetchCardByIdSchema.parse(request.params)

        const fetchCardByIdService = makeFetchCardByIdService()

        const { card } =  await fetchCardByIdService.execute({ id })

        return reply.status(200).send({ card })
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}