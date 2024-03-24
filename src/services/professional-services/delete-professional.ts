import { ExamsRepository } from "../../repositories/exams-repository"
import { ProfesssionalsRepository } from "../../repositories/professionals-repository";

interface DeleteProfessionalServiceRequest {
    id: string
}

interface DeleteProfessionalServiceResponse {
    message: string
}

export class DeleteProfessionalService {
    constructor(
        private professionalsRepository: ProfesssionalsRepository,
    ) { }

    async execute({
        id
    }: DeleteProfessionalServiceRequest): Promise<DeleteProfessionalServiceResponse> {

        try {
            await this.professionalsRepository.delete(id);
            return { message: "Professional successfully deleted." };
        } catch (error) {
            throw new Error("Error deleting professional: " + error);
        }

    }
}