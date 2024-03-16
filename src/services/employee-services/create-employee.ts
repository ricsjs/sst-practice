import { Empregado } from "@prisma/client"
import { EmployeesRepository } from "../../repositories/employees-repository"

interface CreateEmployeeServiceRequest {
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

interface CreateEmployeeServiceResponse {
    employee: Empregado
}

export class CreateEmployeeService {
    constructor(
        private employeesRepository: EmployeesRepository,
    ) { }

    async execute({
        name, cpf, nis, rg, br_pdh, sex, dt_birth, phone, phone_number, blood_type, active, companyId
    }: CreateEmployeeServiceRequest): Promise<CreateEmployeeServiceResponse> {

        const employee = await this.employeesRepository.create({
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
            active,
            company: { connect: { id: companyId } }
        })

        return {
            employee
        }
    }
}