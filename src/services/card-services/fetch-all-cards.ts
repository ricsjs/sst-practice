import { Card } from "@prisma/client";
import { CardsRepository } from "../../repositories/cards-repository";

interface FetchAllCardsServiceRequest {
  companyId: string
}

interface FetchAllCardsServiceResponse {
  cards: Card[]
}

export class FetchAllCardsService {
  constructor(private cardsRepository: CardsRepository) { }

  async execute({
    companyId
  }: FetchAllCardsServiceRequest): Promise<FetchAllCardsServiceResponse> {
    const cards = await this.cardsRepository.findMany(companyId);

    return {
      cards,
    };
  }
}
