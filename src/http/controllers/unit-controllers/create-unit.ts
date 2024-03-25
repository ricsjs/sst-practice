import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCreateUnitService } from "../../../services/factories/unit-factories/make-create-unit-service"
import { UnableToRegisterError } from "../../../services/errors/unable-to-register-error"

export async function createUnit(request: FastifyRequest, reply: FastifyReply) {
    const createUnitSchema = z.object({
        companyId: z.string(),
        identification: z.string(),
        cnpj: z.string(),
        cnea: z.string(),
        activity: z.string(),
        degree_of_risk: z.string(),
        aso: z.string(),
        cep: z.string(),
        address: z.string(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
        email: z.string().email(),
        phone: z.string(),
        legal_representative: z.string(),
        cpf_legal_representative: z.string(),
        cipa_type: z.string(),
        num_employees_cipa: z.number()
    })

    const { companyId, identification, cnpj, cnea, activity, degree_of_risk, aso, cep, address, neighborhood, city, state, email, phone, legal_representative, cpf_legal_representative, cipa_type, num_employees_cipa } = createUnitSchema.parse(request.body)

    try {

        const createUnitService = makeCreateUnitService()

        await createUnitService.execute({
            companyId,
            identification,
            cnpj,
            cnea,
            activity,
            degree_of_risk,
            aso,
            cep,
            address,
            neighborhood,
            city,
            state,
            email,
            phone,
            legal_representative,
            cpf_legal_representative,
            cipa_type,
            num_employees_cipa,
            active: true
        })
    } catch (error) {
        if (error instanceof UnableToRegisterError) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }

    return reply.status(201).send()
}