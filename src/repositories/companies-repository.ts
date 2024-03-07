import { Empresa, Prisma } from "@prisma/client";

export interface CompaniesRepository {
    create(data: Prisma.EmpresaCreateInput): Promise<Empresa>
}