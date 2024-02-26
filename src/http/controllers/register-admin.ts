import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "../../lib/prisma"

export async function registerAdmin(request: FastifyRequest, reply: FastifyReply) {
    const registerAdminSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerAdminSchema.parse(request.body)

    await prisma.admin.create({
        data: {
            name,
            email,
            password_hash: password
        }
    })

    return reply.status(201).send()
}