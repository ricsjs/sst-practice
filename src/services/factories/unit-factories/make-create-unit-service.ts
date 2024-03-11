import { PrismaUnitsRepository } from "../../../repositories/prisma/prisma-units-repository"
import { CreateUnitService } from "../../unit-services/create-unit"

export function makeCreateUnitService() {
    const prismaUnitsRepository = new PrismaUnitsRepository
    const createUnitService = new CreateUnitService(prismaUnitsRepository)

    return createUnitService
}