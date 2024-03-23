import { PrismaExamsRepository } from "../../../repositories/prisma/prisma-exams-repository"
import { FindExamByIdService } from "../../exam-services/find-exam-by-id"

export function makeFetchExamByIdService() {
    const prismaExamsRepository = new PrismaExamsRepository
    const findExamByIdService = new FindExamByIdService(prismaExamsRepository)

    return findExamByIdService
}