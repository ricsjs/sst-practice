import { PrismaEmployeesRepository } from "../../../repositories/prisma/prisma-employees-repository"
import { FetchEmployeeByIdService } from "../../employee-services/fetch-employee-by-id"

export function makeFetchEmployeeByIdService() {
    const prismaEmployeesRepository = new PrismaEmployeesRepository
    const fetchEmployeeByIdService = new FetchEmployeeByIdService(prismaEmployeesRepository)

    return fetchEmployeeByIdService
}