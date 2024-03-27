import { Card } from "@prisma/client"
import { CardsRepository } from "../../repositories/cards-repository"

interface CreateCardServiceRequest {
    professionalId: string
    employeeId: string
    companyId: string
    asoId: string
}

interface CreateCardServiceResponse {
    card: Card
}

export class CreateCardService {
    constructor(
        private cardsRepository: CardsRepository
    ) { }

    async execute({
        professionalId, employeeId, companyId, asoId
    }: CreateCardServiceRequest): Promise<CreateCardServiceResponse> {
        const card = await this.cardsRepository.create({
            professional: { connect: { id: professionalId } },
            employee: { connect: { id: employeeId } },
            company: { connect: { id: companyId } },
            aso: { connect: { id: asoId } },
        })

        return { card }
    }
}