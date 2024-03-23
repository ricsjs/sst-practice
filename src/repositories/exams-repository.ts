import { Exam, Prisma } from "@prisma/client";

export interface ExamsRepository {
    create(data: Prisma.ExamCreateInput): Promise<Exam>
    findMany(): Promise<Exam[]>
    findById(id: string): Promise<Exam | null>
    update(exam: Exam): Promise<Exam>
    delete(id: string): Promise<void>
}