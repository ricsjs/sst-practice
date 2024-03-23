import { FastifyReply, FastifyRequest } from "fastify"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"
import { z } from "zod"
import { makeFetchExamByIdService } from "../../../services/factories/exam-factories/make-fetch-exam-by-id"

export async function fetchExamById(request: FastifyRequest, reply: FastifyReply) {
    const fetchExamByIdSchema = z.object({
        id: z.string()
    })

    try {

        const { id } = fetchExamByIdSchema.parse(request.params)

        const fetchExamByIdService = makeFetchExamByIdService()

        const { exam } =  await fetchExamByIdService.execute({ id })

        return reply.status(200).send({ exam })
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}