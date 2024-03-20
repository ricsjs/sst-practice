import { Unidade } from "@prisma/client"
import { UnitsRepository } from "../../repositories/units-repository"

interface UpdateUnitServiceRequest {
    id: string
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
        id, identification, cnpj, cnea, activity, degree_of_risk, aso, cep, address, neighborhood, city, state, email, phone, legal_representative, cpf_legal_representative, cipa_type, num_employees_cipa, companyId, active
    }: UpdateUnitServiceRequest): Promise<UpdateUnitServiceResponse> {
        try {

            const updatedUnit = await this.unitsRepository.update({
                id,
                identification, cnpj, cnea, activity, degree_of_risk, aso, cep, address, neighborhood, city, state, email, phone, legal_representative, cpf_legal_representative, cipa_type, num_employees_cipa, companyId, active
            })

            return { unit: updatedUnit }
        } catch (error) {
            throw new Error("Error updating unit: " + error)
        }
    }
}
