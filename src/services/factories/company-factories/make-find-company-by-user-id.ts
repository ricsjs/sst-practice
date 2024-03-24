import { PrismaCompaniesRepository } from "../../../repositories/prisma/prisma-companies-repository";
import { FindCompanyByUserId } from "../../company-services/find-company-by-user-id";

export function makeFindCompanyByUserIdService() {
  const prismaCompaniesRepository = new PrismaCompaniesRepository();
  const findCompanyByUserIdService = new FindCompanyByUserId(prismaCompaniesRepository);

  return findCompanyByUserIdService;
}
