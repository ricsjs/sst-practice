import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error"
import { makeUpdateEmployeesService } from "../../../services/factories/employee-factories/make-update-employee-service"
import { customDateSchema } from "../../../../utils/convert-date"

export async function updateEmployees(request: FastifyRequest, reply: FastifyReply) {
    const updateEmployeesBodySchema = z.object({
        name: z.string(),
        cpf: z.string(),
        nis: z.string(),
        rg: z.string(),
        br_pdh: z.string(),
        sex: z.string(),
        dt_birth: customDateSchema,
        phone: z.string(),
        phone_number: z.string(),
        blood_type: z.string(),
        companyId: z.string()
    })

    const updateEmployeesParamSchema = z.object({
        id: z.string()
    })

    try {

        const { id } = updateEmployeesParamSchema.parse(request.params)

        const { name, cpf, nis, rg, br_pdh, sex, dt_birth, phone, phone_number, blood_type, companyId } = updateEmployeesBodySchema.parse(request.body)

        const updateEmployeeService = makeUpdateEmployeesService()

        await updateEmployeeService.execute({
            id,
            name,
            cpf,
            nis,
            rg,
            br_pdh,
            sex,
            dt_birth,
            phone,
            phone_number,
            blood_type,
            companyId,
            active: true
        })

        return reply.status(200).send({ message: "Employee successfully updated." });

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        console.error(error);
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}