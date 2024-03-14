import { prisma } from "../../lib/prisma"
import { Prisma } from "@prisma/client"
import { AsosRepository } from "../asos-repository"

export class PrismaAsosRepository implements AsosRepository {
    async create(data: Prisma.AsoCreateInput) {
        const aso = await prisma.aso.create({
            data,
        })

        return aso
    }
}