import { Unidade } from "@prisma/client"
import { UnitsRepository } from "../../repositories/units-repository"

interface UpdateUnitServiceRequest {
    id: string
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

interface UpdateUnitServiceResponse {
    unit: Unidade
}

export class UpdateUnitService {
    constructor(
        private unitsRepository: UnitsRepository,
    ) { }

    async execute({
        id, identification, cnpj, cnae, activity, degree_of_risk, cep, address, neighborhood, city, state, email, reference_contact, phone, legal_representative, cpf_legal_representative, companyId, active
    }: UpdateUnitServiceRequest): Promise<UpdateUnitServiceResponse> {
        try {

            const updatedUnit = await this.unitsRepository.update({
                id,
                identification, cnpj, cnae, activity, degree_of_risk, cep, address, neighborhood, city, state, email, reference_contact, phone, legal_representative, cpf_legal_representative, companyId, active
            })

            return { unit: updatedUnit }
        } catch (error) {
            throw new Error("Error updating unit: " + error)
        }
    }
}
