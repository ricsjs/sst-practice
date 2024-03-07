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

        const { userType } = await authenticateUserService.execute({
            email,
            password
        })

        if (userType === "admin") {
            return reply.redirect(200, '') // fix me
        } else if (userType === "company") {
            return reply.redirect(200, '').send({ userType }) // fix me
        } else if (userType === "employee") {
            return reply.redirect(200, '').send({ userType }) // fix me
        } else {
            throw new InvalidUserError()
        }
        
    } catch (error) {
        if (error instanceof InvalidCredentialError) {
            return reply.status(400).send({ message: error.message })
        }

        throw error
    }
}