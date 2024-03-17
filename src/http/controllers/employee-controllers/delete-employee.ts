import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"
import { makeDeleteEmployeesService } from "../../../services/factories/employee-factories/make-delete-employee-service"
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error"

export async function deleteEmployees(request: FastifyRequest, reply: FastifyReply) {
    const deleteEmployeesSchema = z.object({
        id: z.string()
    })

    try {

        const { id } = deleteEmployeesSchema.parse(request.params)

        const deleteEmployeeService = makeDeleteEmployeesService()

        await deleteEmployeeService.execute({ id })

        return reply.status(200).send({ message: "Employee successfully deleted." });

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(409).send({ message: error.message })
        }

        console.error(error);
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}