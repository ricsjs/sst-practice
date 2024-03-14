import { PrismaEmployeesRepository } from "../../../repositories/prisma/prisma-employees-repository"
import { CreateEmployeeService } from "../../employee-services/create-employee"

export function makeCreateEmployeeService() {
    const prismaEmployeesRepository = new PrismaEmployeesRepository
    const createEmployeeService = new CreateEmployeeService(prismaEmployeesRepository)

    return createEmployeeService
}