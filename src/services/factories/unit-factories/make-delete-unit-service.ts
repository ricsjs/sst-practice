import { PrismaUnitsRepository } from "../../../repositories/prisma/prisma-units-repository"
import { DeleteUnitService } from "../../unit-services/delete-unit"

export function makeDeleteUnitService() {
    const prismaUnitsRepository = new PrismaUnitsRepository
    const deleteUnitService = new DeleteUnitService(prismaUnitsRepository)

    return deleteUnitService
}