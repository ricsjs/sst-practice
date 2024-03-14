import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { InvalidCredentialError } from "../../services/errors/invalid-credential-error"
import { makeUserAuthenticateService } from "../../services/factories/user-factories/make-authenticate-user-service"
import { InvalidUserError } from "../../services/errors/invalid-user-type-error"

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {
    const authenticateUserBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateUserBodySchema.parse(request.body)

    try {
        
        const authenticateUserService = makeUserAuthenticateService()

        const { user } = await authenticateUserService.execute({
            email,
            password
        })

        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })

        if (user.type === "admin" || user.type === "company" || user.type === "professional") {
            return reply.send({ token });
        } else {
            throw new InvalidUserError();
        }
        
    } catch (error) {
        if (error instanceof InvalidCredentialError) {
            return reply.status(400).send({ message: error.message })
        }

        throw error
    }
}