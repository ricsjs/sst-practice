import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error"
import { makeCreateCompanyService } from "../../../services/factories/company-services/make-create-admin-service"
import { makeCreateProfessionalService } from "../../../services/factories/professional-factories/make-create-professional-service"

export async function createProfessional(request: FastifyRequest, reply: FastifyReply) {
    const createProfessionalSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string(),
        cpf: z.string(),  
        nis: z.string(),
        rg: z.string(),
        cbo: z.string(),
        formation: z.string(),
        organ: z.string(),
        acronym: z.string(),
        ccr: z.string(),
        uf: z.string(),
        title: z.string(),
        jobFunction: z.string()
    })

    const { email, password, name, cpf, nis, rg, cbo, formation, organ, acronym, ccr, uf, title, jobFunction } = createProfessionalSchema.parse(request.body)

    try {

        const createProfessionalService = makeCreateProfessionalService()

        await createProfessionalService.execute({
            email,
            password,
            name,
            cpf,
            nis,
            rg,
            cbo,
            formation,
            organ,
            acronym,
            ccr,
            uf,
            title,
            jobFunction
        })
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }

    return reply.status(201).send()
}