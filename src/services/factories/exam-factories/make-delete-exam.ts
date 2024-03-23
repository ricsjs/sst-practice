import { PrismaExamsRepository } from "../../../repositories/prisma/prisma-exams-repository"
import { DeleteExamService } from "../../exam-services/delete-exam"

export function makeDeleteExamService() {
    const prismaExamsRepository = new PrismaExamsRepository
    const deleteExamService = new DeleteExamService(prismaExamsRepository)

    return deleteExamService
}