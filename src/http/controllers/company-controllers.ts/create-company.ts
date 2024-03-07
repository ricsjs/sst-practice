import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error"
import { makeCreateCompanyService } from "../../../services/factories/company-services/make-create-admin-service"

export async function createCompany(request: FastifyRequest, reply: FastifyReply) {
    const createCompanySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        cnpj: z.string(),
        corporate_reason: z.string(),
        fantasy_name: z.string(),
        identification: z.string(),
        cep: z.string(),
        address: z.string(),
        neighborhood: z.string(),
        phone: z.string(),
        dt_start_esocial: z.coerce.date(),
    })

    const { email, password, cnpj, corporate_reason, fantasy_name, identification, cep, address, neighborhood, phone, dt_start_esocial } = createCompanySchema.parse(request.body)

    try {

        const createCompanyService = makeCreateCompanyService()

        await createCompanyService.execute({
            email,
            password,
            cnpj, corporate_reason, 
            fantasy_name,
            identification,
            cep,
            address,
            neighborhood,
            phone,
            dt_start_esocial
        })
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }

    return reply.status(201).send()
}