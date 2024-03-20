import { Unidade } from "@prisma/client"
import { UnitsRepository } from "../../repositories/units-repository"

interface FetchAllUnitsServiceRequest {
    companyId: string
}

interface FetchAllUnitsServiceResponse {
    units: Unidade[]
}

export class FetchAllUnitsService {
    constructor(
        private unitsRepository: UnitsRepository,
    ) { }

    async execute({
        companyId
    }: FetchAllUnitsServiceRequest): Promise<FetchAllUnitsServiceResponse> {

        const units = await this.unitsRepository.findMany(companyId)

        return {
            units
        }
    }
}