import { Empregado } from "@prisma/client"
import { EmployeesRepository } from "../../repositories/employees-repository"

interface UpdateEmployeeServiceRequest {
    id: string
    name: string
    cpf: string
    nis: string
    rg: string
    br_pdh: string
    sex: string
    dt_birth: Date
    phone: string
    phone_number: string
    blood_type: string
    companyId: string
    active: boolean
}

interface UpdateEmployeeServiceResponse {
    employee: Empregado
}

export class UpdateEmployeesService {
    constructor(
        private employeesRepository: EmployeesRepository,
    ) { }

    async execute({
        id, name, cpf, nis, rg, br_pdh, sex, dt_birth, phone, phone_number, blood_type, companyId, active
    }: UpdateEmployeeServiceRequest): Promise<UpdateEmployeeServiceResponse> {
        try {

            const updatedEmployee = await this.employeesRepository.update({
                id,
                name,
                cpf,
                nis,
                rg,
                br_pdh,
                sex,
                dt_birth,
                phone,
                phone_number,
                blood_type,
                companyId,
                active
            })

            return { employee: updatedEmployee }
        } catch (error) {
            throw new Error("Error updating employee: " + error)
        }
    }
}
