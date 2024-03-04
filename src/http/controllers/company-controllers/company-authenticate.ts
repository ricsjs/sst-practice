import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { InvalidCredentialError } from "../../../services/errors/invalid-credential-error"
import { makeCompanyAuthenticateService } from "../../../services/factories/company-factories/make-company-authenticate-service"

export async function authenticateCompany(request: FastifyRequest, reply: FastifyReply) {
    const authenticateCompanyBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateCompanyBodySchema.parse(request.body)

    try {
        
        const authenticateCompanyService = makeCompanyAuthenticateService()

        await authenticateCompanyService.execute({
            email,
            password
        })
    } catch (error) {
        if (error instanceof InvalidCredentialError) {
            return reply.status(400).send({ message: error.message })
        }

        throw error
    }

    return reply.status(200).send()
}