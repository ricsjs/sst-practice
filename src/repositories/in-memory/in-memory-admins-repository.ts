import { Admin, Prisma } from "@prisma/client";
import { AdminsRepository } from "../admins-repository";

export class InMemoryAdminsRepository implements AdminsRepository {
    public items: Admin[] = []

    async findByEmail(email: string) {
        const user = this.items.find((item) => item.email === email)

        if (!user) {
            return null
        }

        return user
    }

    async create(data: Prisma.AdminCreateInput) {
        const user = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.items.push(user)
        return user
    }
}