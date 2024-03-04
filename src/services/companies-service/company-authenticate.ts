import { Empresa } from "@prisma/client";
import { InvalidCredentialError } from "../errors/invalid-credential-error";
import { compare } from "bcryptjs";
import { CompaniesRepository } from "../../repositories/companies-repository";

interface CompanyAuthenticateServiceRequest {
    email: string
    password: string
}

interface CompanyAuthenticateServiceResponse {
    company: Empresa
}

export class CompanyAuthenticateService {
    constructor(
        private companiesRepository: CompaniesRepository
    ) {}

    async execute({ email, password }: CompanyAuthenticateServiceRequest): Promise<CompanyAuthenticateServiceResponse> {
        const company = await this.companiesRepository.findByEmail(email)

        if (!company) {
            throw new InvalidCredentialError()
        }

        const doesPasswordMatches = await compare(password, company.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialError()
        }

        return {
            company
        }
    }
}