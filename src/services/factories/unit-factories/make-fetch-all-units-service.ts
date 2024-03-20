import { PrismaUnitsRepository } from "../../../repositories/prisma/prisma-units-repository";
import { FetchAllUnitsService } from "../../unit-services/fetch-all-units";

export function makeFetchAllUnitsService() {
    const prismaUnitsRepository = new PrismaUnitsRepository();
    const fetchAllUnitsService = new FetchAllUnitsService(prismaUnitsRepository);

    return fetchAllUnitsService;
}