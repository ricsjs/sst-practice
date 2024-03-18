import { Empregado } from "@prisma/client"
import { EmployeesRepository } from "../../repositories/employees-repository"

interface CreateEmployeeServiceRequest {
    companyId: string
}

interface CreateEmployeeServiceResponse {
    employees: Empregado[]
}

export class FetchAllEmployeesService {
    constructor(
        private employeesRepository: EmployeesRepository,
    ) { }

    async execute({
        companyId
    }: CreateEmployeeServiceRequest): Promise<CreateEmployeeServiceResponse> {

        const employees = await this.employeesRepository.findMany(companyId)

        return {
            employees
        }
    }
}