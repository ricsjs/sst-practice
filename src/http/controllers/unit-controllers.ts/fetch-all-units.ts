import { FastifyReply, FastifyRequest } from "fastify"
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error"
import { makeFetchAllUnitsService } from "../../../services/factories/unit-factories/make-fetch-all-units-service"

export async function fetchAllUnits(request: FastifyRequest, reply: FastifyReply) {
    try {

        const fetchAllUnitsService = makeFetchAllUnitsService()

        const { units } = await fetchAllUnitsService.execute()

        return reply.status(200).send({ units })
    } catch (error) {
        if (error instanceof NoRecordsFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}