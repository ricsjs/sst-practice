import { Unidade } from "@prisma/client"
import { UnitsRepository } from "../../repositories/units-repository"

interface FetchAllUnitsServiceResponse {
    units: Unidade[]
}

export class FetchAllUnitsService {
    constructor(
        private unitsRepository: UnitsRepository,
    ) { }

    async execute(): Promise<FetchAllUnitsServiceResponse> {

        const units = await this.unitsRepository.findMany()

        return {
            units
        }
    }
}