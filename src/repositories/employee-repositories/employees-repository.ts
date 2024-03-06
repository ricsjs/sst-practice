import { Empregado, Prisma } from "@prisma/client";

export interface EmployeesRepository {
    findById(id: string): Promise<Empregado | null>
    findByEmail(email: string): Promise<Empregado | null>
    create(data: Prisma.EmpregadoUncheckedCreateInput): Promise<Empregado>
}