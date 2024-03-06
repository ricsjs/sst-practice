import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error"
import { makeCreateAdminService } from "../../../services/factories/admin-factories/make-admin-register-service"

export async function createAdmin(request: FastifyRequest, reply: FastifyReply) {
    const createAdminSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = createAdminSchema.parse(request.body)

    try {
        
        const createAdminService = makeCreateAdminService()

        await createAdminService.execute({
            name,
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