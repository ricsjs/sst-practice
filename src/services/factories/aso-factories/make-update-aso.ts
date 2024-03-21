import { PrismaAsosRepository } from "../../../repositories/prisma/prisma-asos-repository"
import { UpdateAsoService } from "../../aso-services/update-aso"

export function makeUpdateAsoService() {
    const prismaAsosRepository = new PrismaAsosRepository
    const updateAsoService = new UpdateAsoService(prismaAsosRepository)

    return updateAsoService
}