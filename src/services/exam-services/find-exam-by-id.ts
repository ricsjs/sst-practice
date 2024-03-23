import { Exam } from "@prisma/client"
import { ExamsRepository } from "../../repositories/exams-repository"

interface FindExamByIdServiceRequest {
    id: string
}

interface FindExamByIdServiceResponse {
    exam: Exam | null
}

export class FindExamByIdService {
    constructor(
        private examsRepository: ExamsRepository,
    ) { }

    async execute({
        id
    }: FindExamByIdServiceRequest): Promise<FindExamByIdServiceResponse> {

        const exam = await this.examsRepository.findById(id)

        return {
            exam
        }
    }
}