import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { InvalidCredentialError } from "../../services/errors/invalid-credential-error"
import { makeUserAuthenticateService } from "../../services/factories/user-factories/make-authenticate-user-service"

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {
    const authenticateUserBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateUserBodySchema.parse(request.body)

    try {
        
        const authenticateUserService = makeUserAuthenticateService()

        const { userType } = await authenticateUserService.execute({
            email,
            password
        })

        return reply.status(200).send({ userType })
        
    } catch (error) {
        if (error instanceof InvalidCredentialError) {
            return reply.status(400).send({ message: error.message })
        }

        throw error
    }
}