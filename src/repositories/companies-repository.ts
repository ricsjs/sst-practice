import { Empresa, Prisma } from "@prisma/client";

export interface CompaniesRepository {
    findById(id: string): Promise<Empresa | null>
    findByEmail(email: string): Promise<Empresa | null>
    create(data: Prisma.EmpresaCreateInput): Promise<Empresa>
}