import { Empregado } from "@prisma/client"
import { EmployeesRepository } from "../../repositories/employees-repository"

interface FetchAllEmployeesByUnitIdServiceRequest {
    unitId: string
}

interface FetchAllEmployeesByUnitIdServiceResponse {
    employees: Empregado[]
}

export class FetchAllEmployeesByUnitIdService {
    constructor(
        private employeesRepository: EmployeesRepository,
    ) { }

    async execute({
      unitId
    }: FetchAllEmployeesByUnitIdServiceRequest): Promise<FetchAllEmployeesByUnitIdServiceResponse> {

        const employees = await this.employeesRepository.findManyByUnitId(unitId)

        return {
            employees
        }
    }
}