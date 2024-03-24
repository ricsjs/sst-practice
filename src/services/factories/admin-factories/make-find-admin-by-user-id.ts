import { PrismaAdminsRepository } from "../../../repositories/prisma/prisma-admins-repository";
import { FindAdminByUserId } from "../../admin-services/find-admin-by-user-id";

export function makeFindAdminByUserIdService() {
  const prismaAdminsRepository = new PrismaAdminsRepository();
  const findAdminByUserId = new FindAdminByUserId(prismaAdminsRepository);

  return findAdminByUserId;
}
