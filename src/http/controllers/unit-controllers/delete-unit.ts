import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error"
import { makeDeleteUnitService } from "../../../services/factories/unit-factories/make-delete-unit-service"

export async function deleteUnit(request: FastifyRequest, reply: FastifyReply) {
    const deleteUnitSchema = z.object({
        id: z.string()
    })

    try {

        const { id } = deleteUnitSchema.parse(request.params)

        const deleteUnitService = makeDeleteUnitService()

        await deleteUnitService.execute({ id })

        return reply.status(200).send({ message: "Unit successfully deleted." });

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        console.error(error);
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}