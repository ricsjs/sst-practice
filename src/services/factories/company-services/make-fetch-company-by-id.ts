import { PrismaCompaniesRepository } from "../../../repositories/prisma/prisma-companies-repository";
import { FetchCompanyByIdService } from "../../company-services/find-company-by-id";

export function makeListCompanyByIdService() {
  const prismaCompaniesRepository = new PrismaCompaniesRepository();
  const listCompaniesService = new FetchCompanyByIdService(
    prismaCompaniesRepository
  );

  return listCompaniesService;
}
