import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCompanyRegisterService } from "../../../services/factories/company-factories/make-company-register-service"
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error"

export async function registerCompany(request: FastifyRequest, reply: FastifyReply) {
    const registerCompanySchema = z.object({
        cnpj: z.string(),
        corporate_reason: z.string(),
        fantasy_name: z.string(),
        identification: z.string(),
        cep: z.string(),
        address: z.string(),
        neighborhood: z.string(),
        phone: z.string(),
        dt_start_esocial: z.coerce.date(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { cnpj, corporate_reason, fantasy_name, identification, cep, address, neighborhood, phone, dt_start_esocial, email, password } = registerCompanySchema.parse(request.body)

    try {
        const registerCompanyService = makeCompanyRegisterService()

        await registerCompanyService.execute({
            cnpj,
            corporate_reason,
            fantasy_name,
            identification,
            cep,
            address,
            neighborhood,
            phone,
            dt_start_esocial,
            email,
            password
        })
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }

    return reply.status(201).send()
}