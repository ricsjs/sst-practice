import { hash } from "bcryptjs"
import { Empregado } from "@prisma/client"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"
import { UsersRepository } from "../../repositories/users-repository"
import { EmployeesRepository } from "../../repositories/employees-repository"

interface CreateEmployeeServiceRequest {
    email: string
    password: string
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
}

interface CreateEmployeeServiceResponse {
    employee: Empregado
}

export class CreateEmployeeService {
    constructor(
        private employeesRepository: EmployeesRepository,
        private usersRepository: UsersRepository
    ) { }

    async execute({
        email, password, name, cpf, nis, rg, br_pdh, sex, dt_birth, phone, phone_number, blood_type, companyId
    }: CreateEmployeeServiceRequest): Promise<CreateEmployeeServiceResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const userType = "employee"

        const user = await this.usersRepository.create({
            email,
            password_hash,
            type: userType
        })

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
            company: { connect: { id: companyId } },
            user: { connect: { id: user.id } }
        })

        return {
            employee
        }
    }
}