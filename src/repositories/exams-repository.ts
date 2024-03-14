import { Exam, Prisma } from "@prisma/client";

export interface ExamsRepository {
    create(data: Prisma.ExamCreateInput): Promise<Exam>
}