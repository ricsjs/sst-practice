import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error"
import { makeCreateProfessionalService } from "../../../services/factories/professional-factories/make-create-professional-service"

export async function createProfessional(request: FastifyRequest, reply: FastifyReply) {
    const createProfessionalSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string(),
        cpf: z.string(),  
        rg: z.string(),
        formation: z.string(),
        organ: z.string(),
        acronym: z.string(),
        uf: z.string(),
        title: z.string(),
        phone_number: z.string(),
    })

    const { email, password, name, cpf, rg, formation, organ, acronym, uf, title, phone_number } = createProfessionalSchema.parse(request.body)

    try {

        const createProfessionalService = makeCreateProfessionalService()

        await createProfessionalService.execute({
            email,
            password,
            name,
            cpf,
            rg,
            formation,
            organ,
            acronym,
            uf,
            title,
            phone_number,
            active: true
        })
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }

    return reply.status(201).send()
}