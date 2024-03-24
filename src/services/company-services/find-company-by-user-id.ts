import { Empresa } from "@prisma/client"
import { CompaniesRepository } from "../../repositories/companies-repository"

interface FindCompanyByUserIdRequest {
    userId: string
}

interface FindCompanyByUserIdResponse {
    company: Empresa | null
}

export class FindCompanyByUserId {
    constructor(
        private companiesRepository: CompaniesRepository,
    ) { }

    async execute({
        userId
    }: FindCompanyByUserIdRequest): Promise<FindCompanyByUserIdResponse> {

        const company = await this.companiesRepository.findByUserId(userId)

        return {
            company
        }
    }
}