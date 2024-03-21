import { PrismaCompaniesRepository } from "../../../repositories/prisma/prisma-companies-repository";
import { FetchAllCompaniesService } from "../../company-services/fetch-all-companies";

export function makeListCompaniesService() {
  const prismaCompaniesRepository = new PrismaCompaniesRepository();
  const listCompaniesService = new FetchAllCompaniesService(
    prismaCompaniesRepository
  );

  return listCompaniesService;
}
