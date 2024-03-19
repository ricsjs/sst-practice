import { PrismaUnitsRepository } from "../../../repositories/prisma/prisma-units-repository";
import { FetchAllUnitsService } from "../../unit-services/fetch-all-units";

export function makeListEmployeesService() {
    const prismaUnitsRepository = new PrismaUnitsRepository();
    const listEmployeesService = new FetchAllUnitsService(prismaUnitsRepository);

    return listEmployeesService;
}