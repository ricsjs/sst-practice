import { FastifyReply, FastifyRequest } from "fastify"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"
import { z } from "zod"
import { makeFetchProfessionalById } from "../../../services/factories/professional-factories/make-fetch-professional-by-id"

export async function fetchProfessionalById(request: FastifyRequest, reply: FastifyReply) {
    const fetchProfessionalByIdSchema = z.object({
        id: z.string()
    })

    try {

        const { id } = fetchProfessionalByIdSchema.parse(request.params)

        const findProfessionalByIdService = makeFetchProfessionalById()

        const { professional } =  await findProfessionalByIdService.execute({ id })

        return reply.status(200).send({ professional })
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}