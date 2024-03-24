import { PrismaAdminsRepository } from "../../../repositories/prisma/prisma-admins-repository";
import { FetchAllAdminsService } from "../../admin-services/fetch-all-admins";

export function makeListAdminsService() {
  const prismaAdminsRepository = new PrismaAdminsRepository();
  const listAdminsService = new FetchAllAdminsService(prismaAdminsRepository);

  return listAdminsService;
}
