import { PrismaUnitsRepository } from "../../../repositories/prisma/prisma-units-repository"
import { UpdateUnitService } from "../../unit-services/update-unit"

export function makeUpdateUnitService() {
    const prismaUnitsRepository = new PrismaUnitsRepository
    const updateUnitService = new UpdateUnitService(prismaUnitsRepository)

    return updateUnitService
}