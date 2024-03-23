import { Exam } from "@prisma/client"
import { ExamsRepository } from "../../repositories/exams-repository"

interface FetchAllExamsServiceResponse {
    exams: Exam[]
}

export class FetchAllExamsService {
    constructor(private examsRepository: ExamsRepository) {}

    async execute(): Promise<FetchAllExamsServiceResponse> {

        const exams = await this.examsRepository.findMany();

        return {
            exams
        }
    }
}