import { Empresa, Prisma } from "@prisma/client";

export interface CompaniesRepository {
  create(data: Prisma.EmpresaCreateInput): Promise<Empresa>;
  findMany(companyId: string): Promise<Empresa[]>;
  findById(id: string): Promise<Empresa | null>;
  update(company: Empresa): Promise<Empresa>;
  delete(id: string): Promise<void>;
}
