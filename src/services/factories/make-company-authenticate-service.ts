import { PrismaCompaniesRepository } from "../../repositories/prisma/prisma-companies-repository"
import { CompanyAuthenticateService } from "../companies-service/company-authenticate"

export function makeCompanyAuthenticateService() {
    const prismaCompaniesRepository = new PrismaCompaniesRepository
    const authenticateCompanyService = new CompanyAuthenticateService(prismaCompaniesRepository)

    return authenticateCompanyService
}