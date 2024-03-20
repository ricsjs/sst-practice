import { Unidade } from "@prisma/client";
import { UnitsRepository } from "../../repositories/units-repository";

interface FetchUnitByIdServiceRequest {
    id: string
}

interface FetchUnitByIdServiceResponse {
    unit: Unidade | null
}

export class FetchUnitByIdService {
    constructor(private unitsRepository: UnitsRepository) {}

    async execute({
        id
    }: FetchUnitByIdServiceRequest): Promise<FetchUnitByIdServiceResponse> {
        const unit = await this.unitsRepository.findById(id)
        return {
            unit
        }
    }
}
