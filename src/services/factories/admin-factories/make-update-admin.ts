import { PrismaAdminsRepository } from "../../../repositories/prisma/prisma-admins-repository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { UpdateAdminService } from "../../admin-services/update-admin";

export function makeUpdateAdminService() {
  const prismaAdminRepository = new PrismaAdminsRepository();
  const prismaUsersRepository = new PrismaUsersRepository();

  const updateAdminService = new UpdateAdminService(
    prismaAdminRepository,
    prismaUsersRepository
  );

  return updateAdminService;
}
