import { PrismaCompaniesRepository } from "../../../repositories/prisma/prisma-companies-repository";
import { DeleteCompanyService } from "../../company-services/delete-company";

export function makeDeleteCompanyService() {
  const prismaCompaniesRepository = new PrismaCompaniesRepository();
  const deleteCompanyService = new DeleteCompanyService(
    prismaCompaniesRepository
  );

  return deleteCompanyService;
}
