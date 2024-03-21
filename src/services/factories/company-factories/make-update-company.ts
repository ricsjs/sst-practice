import { PrismaCompaniesRepository } from "../../../repositories/prisma/prisma-companies-repository";
import { UpdateCompanyService } from "../../company-services/update-company";

export function makeUpdateCompanyService() {
  const prismaCompanyRepository = new PrismaCompaniesRepository();
  const updateCompanyService = new UpdateCompanyService(
    prismaCompanyRepository
  );

  return updateCompanyService;
}
