import { PrismaUnitsRepository } from "../../../repositories/prisma/prisma-units-repository"
import { FetchUnitByIdService } from "../../unit-services/find-unit-by-id"

export function makeFetchUnitByIdService() {
    const prismaUnitsRepository = new PrismaUnitsRepository
    const fetchUnitByIdService = new FetchUnitByIdService(prismaUnitsRepository)

    return fetchUnitByIdService
}