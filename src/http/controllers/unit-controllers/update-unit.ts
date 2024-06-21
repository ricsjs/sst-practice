import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error"
import { makeUpdateUnitService } from "../../../services/factories/unit-factories/make-update-unit-service"

export async function updateUnit(request: FastifyRequest, reply: FastifyReply) {
    const updateUnitBodySchema = z.object({
        companyId: z.string(),
        identification: z.string(),
        cnpj: z.string(),
        cnae: z.string(),
        activity: z.string(),
        degree_of_risk: z.string(),
        cep: z.string(),
        address: z.string(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
        email: z.string().email(),
        reference_contact: z.string(),
        phone: z.string(),
        legal_representative: z.string(),
        cpf_legal_representative: z.string(),
    })

    const updateUnitParamSchema = z.object({
        id: z.string()
    })

    try {

        const { id } = updateUnitParamSchema.parse(request.params)

        const { companyId, identification, cnpj, cnae, activity, degree_of_risk, cep, address, neighborhood, city, state, email, reference_contact, phone, legal_representative, cpf_legal_representative } = updateUnitBodySchema.parse(request.body)

        const updateUnitService = makeUpdateUnitService()

        await updateUnitService.execute({
            id,
            companyId,
            identification,
            cnpj,
            cnae,
            activity,
            degree_of_risk,
            cep,
            address,
            neighborhood,
            city,
            state,
            email,
            reference_contact,
            phone,
            legal_representative,
            cpf_legal_representative,
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