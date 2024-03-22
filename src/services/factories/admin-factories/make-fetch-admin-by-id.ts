import { PrismaAdminsRepository } from "../../../repositories/prisma/prisma-admins-repository";
import { FetchAdminByIdService } from "../../admin-services/find-admin-by-id";

export function makeFetchAdminByIdService() {
  const prismaAdminsRepository = new PrismaAdminsRepository();
  const fetchAdminByIdService = new FetchAdminByIdService(
    prismaAdminsRepository
  );

  return fetchAdminByIdService;
}
