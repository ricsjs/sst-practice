import { prisma } from "../../lib/prisma"
import { Prisma, Unidade } from "@prisma/client"
import { UnitsRepository } from "../units-repository"

export class PrismaUnitsRepository implements UnitsRepository {
    async findById(id: string) {
        const unit = await prisma.unidade.findUnique({
            where: {
                id
            }
        })

        return unit
    }

    async update(data: Unidade) {
        const unit = await prisma.unidade.update({
            where: {
                id: data.id
            },
            data
        })

        return unit
    }

    async delete(id: string): Promise<void> {
        await prisma.unidade.update({
            where: { id },
            data: {
                active: false
            }
        })
    }

    async findMany(): Promise<Unidade[]> {
        const units = await prisma.unidade.findMany({
            where: {
                active: true
            }
        });

        return units;
    }

    async create(data: Prisma.UnidadeCreateInput) {
        const unit = await prisma.unidade.create({
            data,
        })

        return unit
    }
}