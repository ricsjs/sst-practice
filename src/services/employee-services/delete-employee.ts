import { EmployeesRepository } from "../../repositories/employees-repository"

interface DeleteEmployeeServiceRequest {
    id: string
}

interface DeleteEmployeeServiceResponse {
    message: string;
}

export class DeleteEmployeesService {
    constructor(
        private employeesRepository: EmployeesRepository,
    ) { }

    async execute({
        id
    }: DeleteEmployeeServiceRequest): Promise<DeleteEmployeeServiceResponse> {
        try {
            await this.employeesRepository.delete(id);
            return { message: "Employee successfully deleted." };
        } catch (error) {
            throw new Error("Error deleting employer: " + error);
        }
    }
}