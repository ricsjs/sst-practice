import { PrismaCompaniesRepository } from "../../../repositories/prisma/prisma-companies-repository";
import { FetchCompanyByIdService } from "../../company-services/find-company-by-id";

export function makeFetchCompanyByIdService() {
  const prismaCompaniesRepository = new PrismaCompaniesRepository();
  const fetchCompanyByIdService = new FetchCompanyByIdService(
    prismaCompaniesRepository
  );

  return fetchCompanyByIdService;
}
