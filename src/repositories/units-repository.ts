import { Unidade, Prisma } from "@prisma/client";

export interface UnitsRepository {
    create(data: Prisma.UnidadeCreateInput): Promise<Unidade>
    findMany(): Promise<Unidade[]>
    findById(id: string): Promise<Unidade | null>
    update(unit: Unidade): Promise<Unidade>
    delete(id: string): Promise<void>
}