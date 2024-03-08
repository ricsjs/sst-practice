import { prisma } from "../../lib/prisma"
import { Prisma } from "@prisma/client"
import { EmployeesRepository } from "../employees-repository"

export class PrismaEmployeesRepository implements EmployeesRepository {
    async create(data: Prisma.EmpregadoCreateInput) {
        const employee = await prisma.empregado.create({
            data,
        })

        return employee
    }
}