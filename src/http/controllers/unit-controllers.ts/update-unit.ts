import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error"
import { makeUpdateUnitService } from "../../../services/factories/unit-factories/make-update-unit-service"

export async function updateUnit(request: FastifyRequest, reply: FastifyReply) {
    const updateUnitBodySchema = z.object({
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

    const updateUnitParamSchema = z.object({
        id: z.string()
    })

    try {

        const { id } = updateUnitParamSchema.parse(request.params)

        const { companyId, identification, cnpj, cnea, activity, degree_of_risk, aso, cep, address, neighborhood, city, state, email, phone, legal_representative, cpf_legal_representative, cipa_type, num_employees_cipa } = updateUnitBodySchema.parse(request.body)

        const updateUnitService = makeUpdateUnitService()

        await updateUnitService.execute({
            id,
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

        return reply.status(200).send({ message: "Unit successfully updated." });

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        console.error(error);
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}