import { PrismaCompaniesRepository } from "../../../repositories/prisma/prisma-companies-repository"
import { CompanyRegisterService } from "../../company-services/company-register"

export function makeCompanyRegisterService() {
    const prismaCompaniesRepository = new PrismaCompaniesRepository
    const registerCompanyService = new CompanyRegisterService(prismaCompaniesRepository)

    return registerCompanyService
}