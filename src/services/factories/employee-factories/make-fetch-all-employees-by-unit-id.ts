import { PrismaEmployeesRepository } from "../../../repositories/prisma/prisma-employees-repository";
import { FetchAllEmployeesByUnitIdService } from "../../employee-services/fetch-all-employees-by-unit-id";

export function makeListEmployeesByUnitIdService() {
    const prismaEmployeesRepository = new PrismaEmployeesRepository();
    const listEmployeesByUnitIdService = new FetchAllEmployeesByUnitIdService(prismaEmployeesRepository);

    return listEmployeesByUnitIdService;
}