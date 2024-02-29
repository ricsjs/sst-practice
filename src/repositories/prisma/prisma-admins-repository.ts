import { prisma } from "../../lib/prisma"
import { Admin, Prisma } from "@prisma/client"
import { AdminsRepository } from "../admins-repository"

export class PrismaAdminsRepository implements AdminsRepository {
    findById(id: string): Promise<Admin | null> {
        throw new Error("Method not implemented.")
    }

    async findByEmail(email: string) {
        const admin = await prisma.admin.findUnique({
            where: {
                email
            }
        })

        return admin
    }

    async create(data: Prisma.AdminCreateInput) {
        const admin = await prisma.admin.create({
            data,
        })

        return admin
    }
}