import { Exam } from "@prisma/client"
import { ExamsRepository } from "../../repositories/exams-repository"

interface CreateExamServiceRequest {
    name: string,
    date: Date,
    asoId: string
}

interface CreateExamServiceResponse {
    exam: Exam
}

export class CreateExamService {
    constructor(
        private examsRepository: ExamsRepository,
    ) { }

    async execute({
        name, date, asoId
    }: CreateExamServiceRequest): Promise<CreateExamServiceResponse> {

        const exam = await this.examsRepository.create({
            name,
            date,
            aso: { connect: { id: asoId } }
        })

        return {
            exam
        }
    }
}