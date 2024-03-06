import { PrismaAdminsRepository } from "../../../repositories/prisma/prisma-admins-repository"
import { RegisterAdminService } from "../../admin-services/create-register"

export function makeCreateAdminService() {
    const prismaAdminsRepository = new PrismaAdminsRepository
    const createAdminService = new RegisterAdminService(prismaAdminsRepository)

    return createAdminService
}