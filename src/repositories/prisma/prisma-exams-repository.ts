import { prisma } from "../../lib/prisma"
import { Prisma } from "@prisma/client"
import { ExamsRepository } from "../exams-repository"

export class PrismaExamsRepository implements ExamsRepository {
    async create(data: Prisma.ExamCreateInput) {
        const exam = await prisma.exam.create({
            data,
        })

        return exam
    }
}