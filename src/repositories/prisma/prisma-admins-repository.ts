import { prisma } from "../../lib/prisma"
import { Prisma } from "@prisma/client"
import { AdminsRepository } from "../admins-repository"

export class PrismaAdminsRepository implements AdminsRepository {
    async findByEmail(email: string) {
        const user = await prisma.admin.findUnique({
            where: {
                email
            }
        })

        return user
    }

    async create(data: Prisma.AdminCreateInput) {
        const admin = await prisma.admin.create({
            data,
        })

        return admin
    }
}