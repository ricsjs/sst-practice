import { FastifyReply, FastifyRequest } from "fastify"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"
import { z } from "zod"
import { makeFetchCompanyByIdService } from "../../../services/factories/company-factories/make-fetch-company-by-id"

export async function fetchCompanyById(request: FastifyRequest, reply: FastifyReply) {
    const fetchCompanyByIdSchema = z.object({
        id: z.string()
    })

    try {

        const { id } = fetchCompanyByIdSchema.parse(request.params)

        const fetchCompanyByIdService = makeFetchCompanyByIdService()

        const { company } =  await fetchCompanyByIdService.execute({ id })

        return reply.status(200).send({ company })
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}