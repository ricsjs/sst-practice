import { Aso, Prisma } from "@prisma/client";

export interface AsosRepository {
    create(data: Prisma.AsoCreateInput): Promise<Aso>
}