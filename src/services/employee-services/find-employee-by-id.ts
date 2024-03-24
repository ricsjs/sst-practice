import { Empregado } from "@prisma/client";
import { EmployeesRepository } from "../../repositories/employees-repository";

interface FetchEmployeeByIdServiceRequest {
    id: string
}

interface FetchEmployeeByIdServiceResponse {
    employee: Empregado | null
}

export class FetchEmployeeByIdService {
    constructor(private employeesRepository: EmployeesRepository) {}

    async execute({
        id
    }: FetchEmployeeByIdServiceRequest): Promise<FetchEmployeeByIdServiceResponse> {
        const employee = await this.employeesRepository.findById(id)
        return {
            employee
        }
    }
}
