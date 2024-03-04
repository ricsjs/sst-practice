import { prisma } from "../../lib/prisma"
import { Empresa, Prisma } from "@prisma/client"
import { CompaniesRepository } from "../companies-repository"

export class PrismaCompaniesRepository implements CompaniesRepository {
    findById(id: string): Promise<Empresa | null> {
        throw new Error("Method not implemented.")
    }

    async findByEmail(email: string) {
        const empresa = await prisma.empresa.findUnique({
            where: {
                email
            }
        })

        return empresa
    }

    async create(data: Prisma.EmpresaCreateInput) {
        const empresa = await prisma.empresa.create({
            data,
        })

        return empresa
    }
}