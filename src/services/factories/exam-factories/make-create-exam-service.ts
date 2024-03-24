import { PrismaExamsRepository } from "../../../repositories/prisma/prisma-exams-repository"
import { CreateExamService } from "../../exam-services/create-exam"

export function makeCreateExamService() {
    const prismaExamsRepository = new PrismaExamsRepository
    const createExamService = new CreateExamService(prismaExamsRepository)

    return createExamService
}