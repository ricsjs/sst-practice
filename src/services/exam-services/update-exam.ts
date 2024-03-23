import { Exam } from "@prisma/client";
import { ExamsRepository } from "../../repositories/exams-repository";

interface UpdateExamServiceRequest {
    id: string;
    name: string;
    date: Date;
    asoId: string
}

interface UpdateExamServiceResponse {
    exam: Exam;
}
export class UpdateExamService {
    constructor(private examsRepository: ExamsRepository) { }

    async execute({
        id,
        name,
        date,
        asoId
    }: UpdateExamServiceRequest): Promise<UpdateExamServiceResponse> {
        try {
            const updatedExam = await this.examsRepository.update({
                id,
                name,
                date,
                asoId
            });

            return { exam: updatedExam };
        } catch (error) {
            throw new Error("Error updating exam: " + error);
        }
    }
}
