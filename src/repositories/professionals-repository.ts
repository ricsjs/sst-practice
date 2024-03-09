import { Prisma, Profissional } from "@prisma/client";

export interface ProfesssionalsRepository {
    create(data: Prisma.ProfissionalCreateInput): Promise<Profissional>
}