import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaAdminsRepository } from "../../repositories/prisma/prisma-admins-repository"
import { AdminAuthenticateService } from "../../services/admin-authenticate"
import { InvalidCredentialError } from "../../services/errors/invalid-credential-error"

export async function authenticateAdmin(request: FastifyRequest, reply: FastifyReply) {
    const authenticateAdminBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateAdminBodySchema.parse(request.body)

    try {
        const prismaAdminsRepository = new PrismaAdminsRepository
        const authenticateAdminService = new AdminAuthenticateService(prismaAdminsRepository)

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