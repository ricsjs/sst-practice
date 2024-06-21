import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateProfessionalService } from "../../../services/factories/professional-factories/make-update-professional";

export async function updateProfessional(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateProfessionalBodySchema = z.object({
        userId: z.string(),
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6).optional(),
        cpf: z.string(),
        rg: z.string(),
        formation: z.string(),
        organ: z.string(),
        acronym: z.string(),
        uf: z.string(),
        title: z.string(),
        phone_number: z.string(),
    });

    const updateProfessionalParamSchema = z.object({
        id: z.string(),
    });

    try {
        const { id } = updateProfessionalParamSchema.parse(request.params);

        const {
            userId,
            name,
            email,
            password,
            cpf,
            rg,
            formation,
            organ,
            acronym,
            uf,
            title,
            phone_number,
        } = updateProfessionalBodySchema.parse(request.body);

        const updateProfessionalService = makeUpdateProfessionalService();

        await updateProfessionalService.execute({
            id,
            userId,
            name,
            email,
            password,
            cpf,
            rg,
            formation,
            organ,
            acronym,
            uf,
            title,
            phone_number,
            active: true,
        });

        return reply.status(200).send({ message: "Professional successfully updated." });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Internal Server Error" });
    }
}
