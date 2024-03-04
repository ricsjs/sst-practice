import { Admin, Prisma } from "@prisma/client";
import { AdminsRepository } from "../admin-repositories/admins-repository";

export class InMemoryAdminsRepository implements AdminsRepository {
    public items: Admin[] = []

    async findById(id: string) {
        const admin = this.items.find((item) => item.id === id)

        if (!admin) {
            return null
        }

        return admin
    }

    async findByEmail(email: string) {
        const admin = this.items.find((item) => item.email === email)

        if (!admin) {
            return null
        }

        return admin
    }

    async create(data: Prisma.AdminCreateInput) {
        const admin = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.items.push(admin)
        return admin
    }
}