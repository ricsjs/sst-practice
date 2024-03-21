import { PrismaAsosRepository } from "../../../repositories/prisma/prisma-asos-repository"
import { FetchAsoByIdService } from "../../aso-services/find-aso-by-id"

export function makeFetchAsoByIdService() {
    const prismaAsosRepository = new PrismaAsosRepository
    const fetchAsoByIdService = new FetchAsoByIdService(prismaAsosRepository)

    return fetchAsoByIdService
}