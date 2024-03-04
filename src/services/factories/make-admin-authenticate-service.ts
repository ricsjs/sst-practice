import { PrismaAdminsRepository } from "../../repositories/prisma/prisma-admins-repository"
import { AdminAuthenticateService } from "../admins-service/admin-authenticate"

export function makeAdminAuthenticateService() {
    const prismaAdminsRepository = new PrismaAdminsRepository
    const authenticateAdminService = new AdminAuthenticateService(prismaAdminsRepository)

    return authenticateAdminService
}