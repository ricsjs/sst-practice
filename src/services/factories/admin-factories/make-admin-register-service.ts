import { PrismaAdminsRepository } from "../../../repositories/prisma/prisma-admins-repository"
import { RegisterAdminService } from "../../admin-services/admin-register"

export function makeAdminRegisterService() {
    const prismaAdminsRepository = new PrismaAdminsRepository
    const registerAdminService = new RegisterAdminService(prismaAdminsRepository)

    return registerAdminService
}