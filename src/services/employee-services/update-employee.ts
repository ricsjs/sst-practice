import { Empregado } from "@prisma/client"
import { EmployeesRepository } from "../../repositories/employees-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

interface UpdateEmployeeServiceRequest {
    employeeId: string
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
        employeeId, name, cpf, nis, rg, br_pdh, sex, dt_birth, phone, phone_number, blood_type, companyId, active
    }: UpdateEmployeeServiceRequest): Promise<UpdateEmployeeServiceResponse> {
        try {
            const employee = await this.employeesRepository.findById(employeeId)

            if (!employee) {
                throw new ResourceNotFoundError()
            }

            const updatedEmployee = await this.employeesRepository.update({
                id: employeeId,
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
