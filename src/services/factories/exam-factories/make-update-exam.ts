import { PrismaExamsRepository } from "../../../repositories/prisma/prisma-exams-repository"
import { UpdateExamService } from "../../exam-services/update-exam"

export function makeUpdateExamService() {
    const prismaExamsRepository = new PrismaExamsRepository
    const updateExamService = new UpdateExamService(prismaExamsRepository)

    return updateExamService
}