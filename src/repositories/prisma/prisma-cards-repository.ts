import { prisma } from "../../lib/prisma"
import { Card, Prisma } from "@prisma/client"
import { CardsRepository } from "../cards-repository"

export class PrismaCardsRepository implements CardsRepository {
    async findById(id: string) {
        const card = await prisma.card.findUnique({
            where: {
                id
            }
        })

        return card
    }

    async findMany(companyId: string): Promise<Card[]> {
        const cards = await prisma.card.findMany({
            where: {
                companyId: companyId
            }
        });

        return cards;
    }

    async create(data: Prisma.CardCreateInput) {
        const card = await prisma.card.create({
            data,
        })

        return card
    }
}