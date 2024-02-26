import { prisma } from "../lib/prisma"
import { Prisma } from "@prisma/client"

export class PrismaAdminsRepository {
    async create(data: Prisma.AdminCreateInput) {
        const admin = await prisma.admin.create({
            data,
        })

        return admin
    }
}