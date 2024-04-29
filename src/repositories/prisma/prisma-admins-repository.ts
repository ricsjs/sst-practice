import { prisma } from "../../lib/prisma";
import { Admin, Prisma } from "@prisma/client";
import { AdminsRepository } from "../admins-repository";

export class PrismaAdminsRepository implements AdminsRepository {
  async create(data: Prisma.AdminCreateInput) {
    const admin = await prisma.admin.create({
      data,
    });

    return admin;
  }

  async findById(id: string) {
    const admin = await prisma.admin.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    return admin;
  }

  async findByUserId(userId: string) {
    const admin = await prisma.admin.findFirst({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    return admin;
  }

  async update(data: Admin) {
    const admin = await prisma.admin.update({
      where: {
        id: data.id,
      },
      data,
    });

    return admin;
  }

  async findMany(): Promise<(Admin & { user: { email: string } })[]> {
    const admins = await prisma.admin.findMany({
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });
    return admins;
  }
}
