import { ExamsRepository } from "../../repositories/exams-repository"

interface DeleteExamServiceRequest {
    id: string
}

interface DeleteExamServiceResponse {
    message: string
}

export class DeleteExamService {
    constructor(
        private examsRepository: ExamsRepository,
    ) { }

    async execute({
        id
    }: DeleteExamServiceRequest): Promise<DeleteExamServiceResponse> {

        try {
            await this.examsRepository.delete(id);
            return { message: "Exam successfully deleted." };
        } catch (error) {
            throw new Error("Error deleting exam: " + error);
        }

    }
}