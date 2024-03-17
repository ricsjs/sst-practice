import { prisma } from "../../lib/prisma"
import { Empregado, Prisma } from "@prisma/client"
import { EmployeesRepository } from "../employees-repository"

export class PrismaEmployeesRepository implements EmployeesRepository {

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