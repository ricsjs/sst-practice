import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { InvalidCredentialError } from "../../../services/errors/invalid-credential-error"
import { makeAdminAuthenticateService } from "../../../services/factories/admin-factories/make-admin-authenticate-service"

export async function authenticateAdmin(request: FastifyRequest, reply: FastifyReply) {
    const authenticateAdminBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateAdminBodySchema.parse(request.body)

    try {
        
        const authenticateAdminService = makeAdminAuthenticateService()

        await authenticateAdminService.execute({
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