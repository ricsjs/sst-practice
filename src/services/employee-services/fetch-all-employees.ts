import { Empregado } from "@prisma/client"
import { EmployeesRepository } from "../../repositories/employees-repository"

interface FetchAllEmployeesServiceRequest {
    companyId: string
}

interface FetchAllEmployeesServiceResponse {
    employees: Empregado[]
}

export class FetchAllEmployeesService {
    constructor(
        private employeesRepository: EmployeesRepository,
    ) { }

    async execute({
        companyId
    }: FetchAllEmployeesServiceRequest): Promise<FetchAllEmployeesServiceResponse> {

        const employees = await this.employeesRepository.findMany(companyId)

        return {
            employees
        }
    }
}