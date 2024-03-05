import { Empresa, Prisma } from "@prisma/client";
import { CompaniesRepository } from "../company-repositories/companies-repository";

export class InMemoryCompaniesRepository implements CompaniesRepository {
    public items: Empresa[] = []

    async findById(id: string) {
        const company = this.items.find((item) => item.id === id)

        if (!company) {
            return null
        }

        return company
    }

    async findByEmail(email: string) {
        const company = this.items.find((item) => item.email === email)

        if (!company) {
            return null
        }

        return company
    }

    async create(data: Prisma.EmpresaCreateInput) {
        const dt_start_esocial: Date = new Date(data.dt_start_esocial);

        const company: Empresa = {
            id: 'company-1',
            cnpj: data.cnpj,
            corporate_reason: data.corporate_reason,
            fantasy_name: data.fantasy_name,
            identification: data.identification,
            cep: data.cep,
            address: data.address,
            neighborhood: data.neighborhood,
            phone: data.phone,
            dt_start_esocial: dt_start_esocial,
            email: data.email,
            password_hash: data.password_hash 
        };

        this.items.push(company)
        return company
    }
}