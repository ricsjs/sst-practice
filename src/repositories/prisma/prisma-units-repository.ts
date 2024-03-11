import { prisma } from "../../lib/prisma"
import { Prisma } from "@prisma/client"
import { EmployeesRepository } from "../employees-repository"
import { UnitsRepository } from "../units-repository"

export class PrismaUnitsRepository implements UnitsRepository {
    async create(data: Prisma.UnidadeCreateInput) {
        const unit = await prisma.unidade.create({
            data,
        })

        return unit
    }
}