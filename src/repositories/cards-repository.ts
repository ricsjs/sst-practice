import { Prisma, Card } from "@prisma/client";

export interface CardsRepository {
    create(data: Prisma.CardCreateInput): Promise<Card>
    findMany(companyId: string): Promise<Card[]>
    findById(id: string): Promise<Card | null>
}