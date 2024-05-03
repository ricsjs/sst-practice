import { PrismaCompaniesRepository } from "../../../repositories/prisma/prisma-companies-repository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { UpdateCompanyService } from "../../company-services/update-company";

export function makeUpdateCompanyService() {
  const prismaCompanyRepository = new PrismaCompaniesRepository();
  const prismaUsersRepository = new PrismaUsersRepository();

  const updateAdminService = new UpdateCompanyService(
    prismaCompanyRepository,
    prismaUsersRepository
  );

  return updateAdminService;
}
