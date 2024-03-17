import { prisma } from "../../lib/prisma"
import { Empregado, Prisma } from "@prisma/client"
import { EmployeesRepository } from "../employees-repository"

export class PrismaEmployeesRepository implements EmployeesRepository {

    async findById(id: string) {
        const employee = await prisma.empregado.findUnique({
            where: {
                id
            }
        })

        return employee
    }

    async update(data: Empregado) {
        const employee = await prisma.empregado.update({
            where: {
                id: data.id
            },
            data
        })

        return employee
    }

    async delete(id: string): Promise<void> {
        await prisma.empregado.update({
            where: { id },
            data: {
                active: false
            }
        })
    }

    async findMany(companyId: string): Promise<Empregado[]> {
        const employees = await prisma.empregado.findMany({
            where: {
                companyId: companyId,
                active: true
            }
        });

        return employees;
    }

    async create(data: Prisma.EmpregadoCreateInput) {
        const employee = await prisma.empregado.create({
            data,
        })

        return employee
    }
}