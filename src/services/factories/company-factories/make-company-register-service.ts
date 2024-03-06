import { PrismaCompaniesRepository } from "../../../repositories/prisma/prisma-companies-repository"
import { CreateCompanyService } from "../../company-services/create-company"

export function makeCreateCompanyService() {
    const prismaCompaniesRepository = new PrismaCompaniesRepository
    const createCompanyService = new CreateCompanyService(prismaCompaniesRepository)

    return createCompanyService
}