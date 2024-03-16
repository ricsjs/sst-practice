import { hash } from "bcryptjs"
import { Empresa } from "@prisma/client"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"
import { UsersRepository } from "../../repositories/users-repository"
import { CompaniesRepository } from "../../repositories/companies-repository"

interface CreateCompanyServiceRequest {
    email: string
    password: string
    cnpj: string
    corporate_reason: string
    fantasy_name: string
    identification: string
    cep: string
    address: string
    neighborhood: string
    phone: string
    dt_start_esocial: Date
    active: boolean
}

interface CreateCompanyServiceResponse {
    company: Empresa
}

export class CreateCompanyService {
    constructor(
        private companiesRepository: CompaniesRepository,
        private usersRepository: UsersRepository
    ) { }

    async execute({
        email, password, cnpj, corporate_reason, fantasy_name, identification, cep, address, neighborhood, phone, dt_start_esocial, active
    }: CreateCompanyServiceRequest): Promise<CreateCompanyServiceResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const userType = "company"

        const user = await this.usersRepository.create({
            email,
            password_hash,
            type: userType
        })

        const company = await this.companiesRepository.create({
            cnpj,
            corporate_reason,
            fantasy_name,
            identification,
            cep,
            address,
            neighborhood,
            phone,
            dt_start_esocial,
            active,
            user: { connect: { id: user.id } }
        })

        return {
            company
        }
    }
}