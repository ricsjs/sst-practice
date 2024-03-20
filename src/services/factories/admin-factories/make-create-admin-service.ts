import { PrismaAdminsRepository } from "../../../repositories/prisma/prisma-admins-repository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { CreateAdminService } from "../../admin-services/create-admin";

export function makeCreateAdminService() {
  const prismaAdminsRepository = new PrismaAdminsRepository();
  const prismaUsersRepository = new PrismaUsersRepository();
  const createAdminService = new CreateAdminService(
    prismaAdminsRepository,
    prismaUsersRepository
  );

  return createAdminService;
}
