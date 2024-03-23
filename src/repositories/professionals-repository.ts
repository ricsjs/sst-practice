import { Prisma, Profissional } from "@prisma/client";

export interface ProfesssionalsRepository {
    create(data: Prisma.ProfissionalCreateInput): Promise<Profissional>
    findMany(): Promise<Profissional[]>
    findById(id: string): Promise<Profissional | null>
    update(professional: Profissional): Promise<Profissional>
    delete(id: string): Promise<void>
}