import { PrismaAsosRepository } from "../../../repositories/prisma/prisma-asos-repository"
import { FetchAllAsosService } from "../../aso-services/fetch-all-asos"

export function makeFetchAllAsoService() {
    const prismaAsosRepository = new PrismaAsosRepository
    const fetchAllAsosService = new FetchAllAsosService(prismaAsosRepository)

    return fetchAllAsosService
}