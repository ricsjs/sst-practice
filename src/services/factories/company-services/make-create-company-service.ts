import { PrismaCompaniesRepository } from "../../../repositories/prisma/prisma-companies-repository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { CreateCompanyService } from "../../company-services/create-company";

export function makeCreateCompanyService() {
  const prismaCompaniesRepository = new PrismaCompaniesRepository();
  const prismaUsersRepository = new PrismaUsersRepository();
  const createCompanyService = new CreateCompanyService(
    prismaCompaniesRepository,
    prismaUsersRepository
  );

  return createCompanyService;
}
