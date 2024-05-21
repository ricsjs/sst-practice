import { FastifyReply, FastifyRequest } from "fastify"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"
import { z } from "zod"
import { makeFindDocumentsByEmployeeId } from "../../../services/factories/document-factories/make-find-documents-by-employee-id"

export async function fetchAllDocumentsByEmployeeId(request: FastifyRequest, reply: FastifyReply) {
    const fetchAllDocumentsByEmployeeIdSchema = z.object({
        employeeId: z.string()
    })

    try {

        const { employeeId } = fetchAllDocumentsByEmployeeIdSchema.parse(request.params)

        const findDocumentByEmployeeId = makeFindDocumentsByEmployeeId()

        const { document } =  await findDocumentByEmployeeId.execute({ employeeId })

        return reply.status(200).send({ document })
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}