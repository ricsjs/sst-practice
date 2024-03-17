import { PrismaEmployeesRepository } from "../../../repositories/prisma/prisma-employees-repository";
import { ListEmployeesService } from "../../employee-services/list-employees";

export function makeListEmployeesService() {
    const prismaEmployeesRepository = new PrismaEmployeesRepository();
    const listEmployeesService = new ListEmployeesService(prismaEmployeesRepository);

    return listEmployeesService;
}