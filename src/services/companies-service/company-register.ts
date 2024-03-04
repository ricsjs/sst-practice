import { Empresa } from "@prisma/client"
import { CompaniesRepository } from "../../repositories/companies-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"

interface CompanyRegisterServiceRequest {
    cnpj: string,
    corporate_reason: string,
    fantasy_name: string,
    identification: string,
    cep: string,
    address: string,
    neighborhood: string,
    phone: string,
    dt_start_esocial: Date
    email: string
    password: string
}

interface CompanyRegisterServiceResponse {
    user: Empresa
}

export class CompanyRegisterService {
    constructor(private companiesRepository: CompaniesRepository) {}

    async execute({
        cnpj, corporate_reason, fantasy_name, identification, cep, address, neighborhood, phone, dt_start_esocial, email, password 
    }: CompanyRegisterServiceRequest): Promise<CompanyRegisterServiceResponse> {
        const password_hash = await hash(password, 6)

        const companyWithSameEmail = await this.companiesRepository.findByEmail(email)

        if (companyWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.companiesRepository.create({
            cnpj,
            corporate_reason,
            fantasy_name,
            identification,
            cep,
            address,
            neighborhood,
            phone,
            dt_start_esocial,
            email,
            password_hash
        })

        return {
            user
        }
    }
}