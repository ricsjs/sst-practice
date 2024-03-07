import { PrismaAdminsRepository } from "../../../repositories/prisma/prisma-admins-repository"
import { CreateAdminService } from "../../admin-services/create-admin"

export function makeCreateAdminService() {
    const prismaAdminsRepository = new PrismaAdminsRepository
    const createAdminService = new CreateAdminService(prismaAdminsRepository)

    return createAdminService
}