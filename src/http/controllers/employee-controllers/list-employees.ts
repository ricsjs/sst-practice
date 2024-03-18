import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeListEmployeesService } from "../../../services/factories/employee-factories/make-fetch-all-employees-service"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"

export async function listEmployees(request: FastifyRequest, reply: FastifyReply) {
    const listEmployeesSchema = z.object({
        companyId: z.string()
    })

    const { companyId } = listEmployeesSchema.parse(request.query)

    try {

        const createEmployeeService = makeListEmployeesService()

        const { employees } = await createEmployeeService.execute({ companyId })

        return reply.status(200).send({ employees })
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}