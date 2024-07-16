import { FastifyReply, FastifyRequest } from "fastify"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"
import { z } from "zod"
import { makeFindDocumentsWithMedicalConfidentialityByEmployeeId } from "../../../services/factories/document-factories/make-find-documents-with-medical-confidentiality-by-employee-id"

export async function fetchAllDocumentsWithMedicalConfidentialityByEmployeeId(request: FastifyRequest, reply: FastifyReply) {
    const fetchAllDocumentsWithMedicalConfidentialityByEmployeeIdSchema = z.object({
        employeeId: z.string()
    })

    try {

        const { employeeId } = fetchAllDocumentsWithMedicalConfidentialityByEmployeeIdSchema.parse(request.params)

        const findDocumentsWithMedicalConfidentialityByEmployeeIdSchema = makeFindDocumentsWithMedicalConfidentialityByEmployeeId()

        const { document } =  await findDocumentsWithMedicalConfidentialityByEmployeeIdSchema.execute({ employeeId })

        return reply.status(200).send({ document })
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}