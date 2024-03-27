import { prisma } from "../../lib/prisma"
import { Aso, Prisma } from "@prisma/client"
import { AsosRepository } from "../asos-repository"

export class PrismaAsosRepository implements AsosRepository {
    async findMany(companyId: string): Promise<Aso[]> {
        const asos = await prisma.aso.findMany({
            where: {
                empresaId: companyId,
                active: true
            }
        });

        return asos;
    }

    async findById(id: string) {
        const aso = await prisma.aso.findUnique({
            where: {
                id,
            },
        });

        return aso;
    }

    async update(data: Aso) {
        const aso = await prisma.aso.update({
            where: {
                id: data.id,
            },
            data,
        });

        return aso;
    }

    async delete(id: string): Promise<void> {
        await prisma.aso.update({
            where: { id },
            data: {
                active: false,
            },
        });
    }

    async create(data: Prisma.AsoCreateInput) {
        const aso = await prisma.aso.create({
            data,
        })

        return aso
    }
}