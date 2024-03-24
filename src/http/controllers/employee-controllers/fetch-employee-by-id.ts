import { FastifyReply, FastifyRequest } from "fastify"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"
import { z } from "zod"
import { makeFetchEmployeeByIdService } from "../../../services/factories/employee-factories/make-fetch-employee-by-id"

export async function fetchEmployeeById(request: FastifyRequest, reply: FastifyReply) {
    const fetchEmployeeByIdSchema = z.object({
        id: z.string()
    })

    try {

        const { id } = fetchEmployeeByIdSchema.parse(request.params)

        const fetchEmployeeByIdService = makeFetchEmployeeByIdService()

        const { employee } =  await fetchEmployeeByIdService.execute({ id })

        return reply.status(200).send({ employee })
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}