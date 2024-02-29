import { Admin, Prisma } from "@prisma/client";

export interface AdminsRepository {
    findById(id: string): Promise<Admin | null>
    findByEmail(email: string): Promise<Admin | null>
    create(data: Prisma.AdminCreateInput): Promise<Admin>
}