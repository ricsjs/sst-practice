import { PrismaEmployeesRepository } from "../../../repositories/prisma/prisma-employees-repository";
import { FetchAllEmployeesService } from "../../employee-services/fetch-all-employees";

export function makeListEmployeesService() {
    const prismaEmployeesRepository = new PrismaEmployeesRepository();
    const listEmployeesService = new FetchAllEmployeesService(prismaEmployeesRepository);

    return listEmployeesService;
}