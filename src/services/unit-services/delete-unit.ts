import { UnitsRepository } from "../../repositories/units-repository";

interface DeleteUnitServiceRequest {
    id: string
}

interface DeleteUnitServiceResponse {
    message: string;
}

export class DeleteUnitService {
    constructor(
        private unitsRepository: UnitsRepository,
    ) { }

    async execute({
        id
    }: DeleteUnitServiceRequest): Promise<DeleteUnitServiceResponse> {
        try {
            await this.unitsRepository.delete(id);
            return { message: "Unit successfully deleted." };
        } catch (error) {
            throw new Error("Error deleting unit: " + error);
        }
    }
}