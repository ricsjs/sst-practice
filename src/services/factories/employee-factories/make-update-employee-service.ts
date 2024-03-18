import { PrismaEmployeesRepository } from "../../../repositories/prisma/prisma-employees-repository";
import { UpdateEmployeesService } from "../../employee-services/update-employee";

export function makeUpdateEmployeesService() {
    const prismaEmployeesRepository = new PrismaEmployeesRepository();
    const updateEmployeesService = new UpdateEmployeesService(prismaEmployeesRepository);

    return updateEmployeesService;
}