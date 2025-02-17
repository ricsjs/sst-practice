import { prisma } from "../../lib/prisma"
import { Prisma, Profissional } from "@prisma/client"
import { ProfesssionalsRepository } from "../professionals-repository"

export class PrismaProfessionalsRepository implements ProfesssionalsRepository {
    async findMany(): Promise<(Profissional & { user: { email: string } })[]> {
        const professionals = await prisma.profissional.findMany({
            where: {
                active: true
            },
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            }
        });

        return professionals;
    }


    async findById(id: string) {
        const professional = await prisma.profissional.findUnique({
            where: {
                id
            },
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            },
        })

        return professional
    }

    async findByUserId(userId: string) {
        const professional = await prisma.profissional.findFirst({
            where: {
                userId: userId
            },
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            },
        })

        return professional
    }

    async update(data: Profissional) {
        const professional = await prisma.profissional.update({
            where: {
                id: data.id
            },
            data
        })

        return professional
    }

    async delete(id: string): Promise<void> {
        await prisma.profissional.update({
            where: { id },
            data: {
                active: false,
            },
        });
    }

    async create(data: Prisma.ProfissionalCreateInput) {
        const professional = await prisma.profissional.create({
            data,
        })

        return professional
    }
}