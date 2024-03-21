import { Empresa } from "@prisma/client"
import { CompaniesRepository } from "../../repositories/companies-repository"

interface FetchCompanyByIdServiceRequest {
    id: string
}

interface FetchCompanyByIdServiceResponse {
    company: Empresa | null
}

export class FetchCompanyByIdService {
    constructor(private companiesRepository: CompaniesRepository) {}

    async execute({
        id
    }: FetchCompanyByIdServiceRequest): Promise<FetchCompanyByIdServiceResponse> {
        const company = await this.companiesRepository.findById(id)
        return {
            company
        }
    }
}
