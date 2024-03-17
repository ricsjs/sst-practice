import { Empregado, Prisma } from "@prisma/client";

export interface EmployeesRepository {
    create(data: Prisma.EmpregadoCreateInput): Promise<Empregado>
    findMany(companyId: string): Promise<Empregado[]>
    delete(id: string): Promise<void>
}