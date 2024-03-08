import { PrismaEmployeesRepository } from "../../../repositories/prisma/prisma-employees-repository"
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository"
import { CreateEmployeeService } from "../../employee-services/create-employee"

export function makeCreateEmployeeService() {
    const prismaEmployeesRepository = new PrismaEmployeesRepository
    const prismaUsersRepository = new PrismaUsersRepository
    const createEmployeeService = new CreateEmployeeService(prismaEmployeesRepository, prismaUsersRepository)

    return createEmployeeService
}