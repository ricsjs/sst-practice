import { Card } from "@prisma/client";
import { CardsRepository } from "../../repositories/cards-repository";

interface FetchCardByIdServiceRequest {
  id: string;
}

interface FetchCardByIdServiceResponse {
  card: Card | null;
}

export class FetchCardByIdService {
  constructor(private cardsRepository: CardsRepository) {}

  async execute({
    id,
  }: FetchCardByIdServiceRequest): Promise<FetchCardByIdServiceResponse> {
    const card = await this.cardsRepository.findById(id);

    return {
      card,
    };
  }
}
