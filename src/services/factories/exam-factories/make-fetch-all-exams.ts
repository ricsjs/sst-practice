import { PrismaExamsRepository } from "../../../repositories/prisma/prisma-exams-repository"
import { FetchAllExamsService } from "../../exam-services/fetch-all-exams"

export function makeFetchAllExamsService() {
    const prismaExamsRepository = new PrismaExamsRepository
    const fetchAllExamsService = new FetchAllExamsService(prismaExamsRepository)

    return fetchAllExamsService
}