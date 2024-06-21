import { Card } from "@prisma/client"
import { CardsRepository } from "../../repositories/cards-repository"

interface CreateCardServiceRequest {
    professionalId: string
    employeeId: string
    companyId: string
    documentId: string
}

interface CreateCardServiceResponse {
    card: Card
}

export class CreateCardService {
    constructor(
        private cardsRepository: CardsRepository
    ) { }

    async execute({
        professionalId, employeeId, companyId, documentId
    }: CreateCardServiceRequest): Promise<CreateCardServiceResponse> {
        const card = await this.cardsRepository.create({
            professional: { connect: { id: professionalId } },
            employee: { connect: { id: employeeId } },
            company: { connect: { id: companyId } },
            document: { connect: { id: documentId } },
        })

        return { card }
    }
}