import { prisma } from "../../lib/prisma";
import { Empresa, Prisma } from "@prisma/client";
import { CompaniesRepository } from "../companies-repository";

export class PrismaCompaniesRepository implements CompaniesRepository {
  async create(data: Prisma.EmpresaCreateInput) {
    const company = await prisma.empresa.create({
      data,
    });

    return company;
  }

  async findById(id: string) {
    const company = await prisma.empresa.findUnique({
      where: {
        id,
      },
    });

    return company;
  }

  async update(data: Empresa) {
    const company = await prisma.empresa.update({
      where: {
        id: data.id,
      },
      data,
    });

    return company;
  }

  async findMany(): Promise<Empresa[]> {
    const companies = await prisma.empresa.findMany({
      where: {
        active: true
      }
    });

    return companies;
  }

  async delete(id: string): Promise<void> {
    await prisma.empresa.update({
      where: { id },
      data: {
        active: false,
      },
    });
  }
}
