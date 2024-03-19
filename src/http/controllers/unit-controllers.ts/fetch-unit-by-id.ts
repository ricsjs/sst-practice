import { FastifyReply, FastifyRequest } from "fastify"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"
import { makeFetchUnitByIdService } from "../../../services/factories/unit-factories/make-fetch-unit-by-id-service"
import { z } from "zod"

export async function fetchUnitById(request: FastifyRequest, reply: FastifyReply) {
    const fetchUnitByIdSchema = z.object({
        id: z.string()
    })

    try {

        const { id } = fetchUnitByIdSchema.parse(request.params)

        const fetchUnitByIdService = makeFetchUnitByIdService()

        const { unit } =  await fetchUnitByIdService.execute({ id })

        return reply.status(200).send({ unit })
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}