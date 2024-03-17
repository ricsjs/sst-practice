import { PrismaEmployeesRepository } from "../../../repositories/prisma/prisma-employees-repository"
import { DeleteEmployeesService } from "../../employee-services/delete-employee"

export function makeDeleteEmployeesService() {
    const prismaEmployeesRepository = new PrismaEmployeesRepository
    const deleteEmployeeService = new DeleteEmployeesService(prismaEmployeesRepository)

    return deleteEmployeeService
}