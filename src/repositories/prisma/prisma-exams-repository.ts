import { prisma } from "../../lib/prisma"
import { Exam, Prisma } from "@prisma/client"
import { ExamsRepository } from "../exams-repository"

export class PrismaExamsRepository implements ExamsRepository {
    async findMany(): Promise<Exam[]> {
        const exams = await prisma.exam.findMany();

        return exams;
    }
    
    async findById(id: string) {
        const exam = await prisma.exam.findUnique({
            where: {
                id
            }
        })

        return exam
    }

    async update(data: Exam) {
        const exam = await prisma.exam.update({
            where: {
                id: data.id
            },
            data
        })

        return exam
    }    

    async delete(id: string): Promise<void> {
        await prisma.exam.delete({
            where: { id }}
    )}
    
    async create(data: Prisma.ExamCreateInput) {
        const exam = await prisma.exam.create({
            data,
        })

        return exam
    }
}