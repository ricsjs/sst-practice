import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"
import { makeListEmployeesByUnitIdService } from "../../../services/factories/employee-factories/make-fetch-all-employees-by-unit-id"

export async function fetchAllEmployeesByUnitId(request: FastifyRequest, reply: FastifyReply) {
    const listEmployeesByUnitIdSchema = z.object({
        unitId: z.string()
    })

    const { unitId } = listEmployeesByUnitIdSchema.parse(request.params)

    try {

        const fetchAllEmployeesByUnitIdService = makeListEmployeesByUnitIdService()

        const { employees } = await fetchAllEmployeesByUnitIdService.execute({ unitId })

        return reply.status(200).send({ employees })
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}