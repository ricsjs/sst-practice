import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { UserAuthenticateService } from "../../user-services/user-authenticate";

export function makeUserAuthenticateService() {
    const prismaUsersRepository = new PrismaUsersRepository
    const authenticateUserService = new UserAuthenticateService(prismaUsersRepository)

    return authenticateUserService
}