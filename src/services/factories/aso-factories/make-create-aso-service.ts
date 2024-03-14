import { PrismaAsosRepository } from "../../../repositories/prisma/prisma-asos-repository"
import { CreateAsoService } from "../../aso-services/create-aso"

export function makeCreateAsoService() {
    const prismaAsosRepository = new PrismaAsosRepository
    const createAsoService = new CreateAsoService(prismaAsosRepository)

    return createAsoService
}