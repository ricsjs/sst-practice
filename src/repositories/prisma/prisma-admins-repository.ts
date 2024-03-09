import { prisma } from "../../lib/prisma"
import { Prisma } from "@prisma/client"
import { AdminsRepository } from "../admins-repository"

export class PrismaAdminsRepository implements AdminsRepository {
    async create(data: Prisma.AdminCreateInput) {
        const admin = await prisma.admin.create({
            data,
        })

        return admin
    }
}