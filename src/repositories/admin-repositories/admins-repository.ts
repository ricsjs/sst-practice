import { Admin, Prisma } from "@prisma/client";

export interface AdminsRepository {
    create(data: Prisma.AdminCreateInput): Promise<Admin>
}