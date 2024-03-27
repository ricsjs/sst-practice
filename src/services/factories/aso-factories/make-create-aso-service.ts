import { PrismaAsosRepository } from "../../../repositories/prisma/prisma-asos-repository"
import { PrismaCardsRepository } from "../../../repositories/prisma/prisma-cards-repository"
import { CreateAsoService } from "../../aso-services/create-aso"

export function makeCreateAsoService() {
    const prismaAsosRepository = new PrismaAsosRepository
    const prismaCardsRepository = new PrismaCardsRepository
    const createAsoService = new CreateAsoService(prismaAsosRepository, prismaCardsRepository)

    return createAsoService
}