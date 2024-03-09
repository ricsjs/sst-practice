import { PrismaProfessionalsRepository } from "../../../repositories/prisma/prisma-professionals-repository"
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository"
import { CreateProfessionalService } from "../../professional-services/create-professional"

export function makeCreateProfessionalService() {
    const prismaProfessionalsRepository = new PrismaProfessionalsRepository
    const prismaUsersRepository = new PrismaUsersRepository
    const createProfessionalService = new CreateProfessionalService(prismaProfessionalsRepository, prismaUsersRepository)

    return createProfessionalService
}