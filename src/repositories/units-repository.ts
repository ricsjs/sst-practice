import { Unidade, Prisma } from "@prisma/client";

export interface UnitsRepository {
    create(data: Prisma.UnidadeCreateInput): Promise<Unidade>
}