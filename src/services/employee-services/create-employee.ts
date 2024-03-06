import { Empregado } from "@prisma/client"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"
import { EmployeesRepository } from "../../repositories/employee-repositories/employees-repository"

interface CreateEmployeeServiceRequest {
    empresaId: string,
    name: string,
    cpf: string,
    nis: string,
    rg: string,
    br_pdh: string,
    sex: string,
    dt_birth: Date,
    phone: string,
    phone_number: string,
    blood_type: string,
    email: string,
    password: string,
}

interface CreateEmployeeServiceResponse {
    user: Empregado
}

export class CreateEmployeeService {
    constructor(private employeesRepository: EmployeesRepository) { }

    async execute({
        empresaId, name, cpf, nis, rg, br_pdh, sex, dt_birth, phone, phone_number, blood_type, email, password,
    }: CreateEmployeeServiceRequest): Promise<CreateEmployeeServiceResponse> {
        const password_hash = await hash(password, 6)

        const employeeWithSameEmail = await this.employeesRepository.findByEmail(email)

        if (employeeWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.employeesRepository.create({
            empresaId,
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
            email,
            password_hash,
        })

        return {
            user
        }
    }
}