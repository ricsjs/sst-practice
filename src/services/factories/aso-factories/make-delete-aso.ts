import { PrismaAsosRepository } from "../../../repositories/prisma/prisma-asos-repository"
import { DeleteAsoService } from "../../aso-services/delete-aso"

export function makeDeleteAsoService() {
    const prismaAsosRepository = new PrismaAsosRepository
    const deleteAsoService = new DeleteAsoService(prismaAsosRepository)

    return deleteAsoService
}