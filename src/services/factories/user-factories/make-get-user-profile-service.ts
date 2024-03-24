import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { GetUserProfileService } from "../../user-services/get-user-profile";

export function makeGetUserProfileService() {
    const prismaUsersRepository = new PrismaUsersRepository;
    const authenticateUserService = new GetUserProfileService(prismaUsersRepository);

    return authenticateUserService;
}