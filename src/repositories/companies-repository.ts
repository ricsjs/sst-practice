import { Empresa, Prisma } from "@prisma/client";

export interface CompaniesRepository {
  create(data: Prisma.EmpresaCreateInput): Promise<Empresa>;
  findMany(): Promise<Empresa[]>;
  findById(id: string): Promise<Empresa | null>;
  findByUserId(id: string): Promise<Empresa | null>;
  update(company: Empresa): Promise<Empresa>;
  delete(id: string): Promise<void>;
}
