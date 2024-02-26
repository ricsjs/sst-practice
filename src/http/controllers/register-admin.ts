import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RegisterAdminService } from "../../services/register-admin"
import { PrismaAdminsRepository } from "../../repositories/prisma/prisma-admins-repository"
import { AdminAlreadyExistsError } from "../../services/errors/admin-already-exists-error"

export async function registerAdmin(request: FastifyRequest, reply: FastifyReply) {
    const registerAdminSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerAdminSchema.parse(request.body)

    try {
        const prismaAdminsRepository = new PrismaAdminsRepository
        const registerAdminService = new RegisterAdminService(prismaAdminsRepository)

        await registerAdminService.execute({
            name,
            email,
            password
        })
    } catch (error) {
        if (error instanceof AdminAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }

        throw error       
    }

    return reply.status(201).send()
}