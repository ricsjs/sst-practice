import { PrismaEmployeeRepository } from "../../../repositories/prisma/prisma-employees-repository"
import { CreateEmployeeService } from "../../employee-services/create-employee"

export function makeCreateEmployeeService() {
    const PrismaEmployeesRepository = new PrismaEmployeeRepository
    const createEmployeeService = new CreateEmployeeService(PrismaEmployeesRepository)

    return createEmployeeService
}