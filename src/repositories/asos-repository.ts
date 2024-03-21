import { Aso, Prisma } from "@prisma/client";

export interface AsosRepository {
    create(data: Prisma.AsoCreateInput): Promise<Aso>
    findMany(): Promise<Aso[]>
    findById(id: string): Promise<Aso | null>;
    update(aso: Aso): Promise<Aso>;
    delete(id: string): Promise<void>;
}