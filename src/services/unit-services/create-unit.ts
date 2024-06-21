import { Unidade } from "@prisma/client"
import { UnitsRepository } from "../../repositories/units-repository"

interface CreateUnitServiceRequest {
    identification: string
    cnpj: string
    cnae: string
    activity: string
    degree_of_risk: string
    cep: string
    address: string
    neighborhood: string
    city: string
    state: string
    email: string
    reference_contact: string
    phone: string
    legal_representative: string
    cpf_legal_representative: string
    companyId: string
    active: boolean
}

interface CreateUnitServiceResponse {
    unit: Unidade
}

export class CreateUnitService {
    constructor(
        private unitsRepository: UnitsRepository,
    ) { }

    async execute({
        identification, cnpj, cnae, activity, degree_of_risk, cep, address, neighborhood, city, state, email, reference_contact, phone, legal_representative, cpf_legal_representative, companyId, active
    }: CreateUnitServiceRequest): Promise<CreateUnitServiceResponse> {

        const unit = await this.unitsRepository.create({
            identification,
            cnpj,
            cnae, 
            activity, 
            degree_of_risk,
            cep,
            address, 
            neighborhood,
            city,
            state,
            email,
            reference_contact,
            phone,
            legal_representative,
            cpf_legal_representative,
            active,
            company: { connect: { id: companyId } },
        })

        return {
            unit
        }
    }
}