import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error"
import { makeCreateEmployeeService } from "../../../services/factories/employee-factories/make-create-employee-service"

export async function createEmployee(request: FastifyRequest, reply: FastifyReply) {
    const createEmployeeSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        companyId: z.string(),
        name: z.string(),
        cpf: z.string(),
        nis: z.string(),
        rg: z.string(),
        br_pdh: z.string(),
        sex: z.string(),
        dt_birth: z.coerce.date(),
        phone: z.string(),
        phone_number: z.string(),
        blood_type: z.string()
    })

    const { email, password, companyId, name, cpf, nis, rg, br_pdh, sex, dt_birth, phone, phone_number, blood_type } = createEmployeeSchema.parse(request.body)

    try {

        const createEmployeeService = makeCreateEmployeeService()

        await createEmployeeService.execute({
            email,
            password,
            companyId,
            name,
            cpf,
            nis,
            rg,
            br_pdh,
            sex,
            dt_birth, 
            phone,
            phone_number,
            blood_type
        })
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }

    return reply.status(201).send()
}