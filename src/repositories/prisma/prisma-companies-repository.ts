import { prisma } from "../../lib/prisma"
import { Prisma } from "@prisma/client"
import { CompaniesRepository } from "../companies-repository"

export class PrismaCompaniesRepository implements CompaniesRepository {
    async create(data: Prisma.EmpresaCreateInput) {
        const company = await prisma.empresa.create({
            data,
        })

        return company
    }
}