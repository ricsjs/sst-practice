import { FastifyReply, FastifyRequest } from "fastify"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"
import { z } from "zod"
import { makeFindProfessionalByUserIdService } from "../../../services/factories/professional-factories/make-find-professional-by-user-id"

export async function fetchProfessionalById(request: FastifyRequest, reply: FastifyReply) {
    const fetchProfessionalByIdSchema = z.object({
        userId: z.string()
    })

    try {

        const { userId } = fetchProfessionalByIdSchema.parse(request.params)

        const findProfessionalByIdService = makeFindProfessionalByUserIdService()

        const { professional } =  await findProfessionalByIdService.execute({ userId })

        return reply.status(200).send({ professional })
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}