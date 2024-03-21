import { FastifyReply, FastifyRequest } from "fastify"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"
import { z } from "zod"
import { makeFetchCompanyByIdService } from "../../../services/factories/company-factories/make-fetch-company-by-id"
import { makeFetchAsoByIdService } from "../../../services/factories/aso-factories/make-fetch-aso-by-id"

export async function fetchAsoById(request: FastifyRequest, reply: FastifyReply) {
    const fetchAsoByIdSchema = z.object({
        id: z.string()
    })

    try {

        const { id } = fetchAsoByIdSchema.parse(request.params)

        const fetchAsoByIdService = makeFetchAsoByIdService()

        const { aso } =  await fetchAsoByIdService.execute({ id })

        return reply.status(200).send({ aso })
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}