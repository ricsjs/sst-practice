import { Admin, Prisma } from "@prisma/client";

export interface AdminsRepository {
  create(data: Prisma.AdminCreateInput): Promise<Admin>;
  findMany(): Promise<Admin[]>;
  findById(id: string): Promise<Admin | null>;
  findByUserId(userId: string): Promise<Admin | null>;
  update(company: Admin): Promise<Admin>;
}
