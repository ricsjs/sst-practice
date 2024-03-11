import { Unidade } from "@prisma/client"
import { UnitsRepository } from "../../repositories/units-repository"

interface CreateUnitServiceRequest {
    identification: string
    cnpj: string
    cnea: string
    activity: string
    degree_of_risk: string
    aso: string
    cep: string
    address: string
    neighborhood: string
    city: string
    state: string
    email: string
    phone: string
    legal_representative: string
    cpf_legal_representative: string
    cipa_type: string
    num_employees_cipa: number
    companyId: string
}

interface CreateUnitServiceResponse {
    unit: Unidade
}

export class CreateUnitService {
    constructor(
        private unitsRepository: UnitsRepository,
    ) { }

    async execute({
        identification, cnpj, cnea, activity, degree_of_risk, aso, cep, address, neighborhood, city, state, email, phone, legal_representative, cpf_legal_representative, cipa_type, num_employees_cipa, companyId
    }: CreateUnitServiceRequest): Promise<CreateUnitServiceResponse> {

        const unit = await this.unitsRepository.create({
            identification,
            cnpj,
            cnea, 
            activity, 
            degree_of_risk,
            aso,
            cep,
            address, 
            neighborhood,
            city,
            state,
            email,
            phone,
            legal_representative,
            cpf_legal_representative,
            cipa_type,
            num_employees_cipa,
            company: { connect: { id: companyId } },
        })

        return {
            unit
        }
    }
}