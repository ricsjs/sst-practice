import { prisma } from "../../lib/prisma"
import { Empregado, Prisma } from "@prisma/client"
import { EmployeesRepository } from "../employee-repositories/employees-repository"

export class PrismaEmployeeRepository implements EmployeesRepository {
    findById(id: string): Promise<Empregado | null> {
        throw new Error("Method not implemented.")
    }

    async findByEmail(email: string) {
        const empregado = await prisma.empregado.findUnique({
            where: {
                email
            }
        })

        return empregado
    }

    async create(data: Prisma.EmpregadoUncheckedCreateInput) {
        const empregado = await prisma.empregado.create({
            data,
        })

        return empregado
    }
}