import { PrismaCardsRepository } from "../../../repositories/prisma/prisma-cards-repository";
import { FetchCardByIdService } from "../../card-services/find-card-by-id";

export function makeFetchCardByIdService() {
  const prismaCardsRepository = new PrismaCardsRepository();
  const fetchCardByIdService = new FetchCardByIdService(prismaCardsRepository);

  return fetchCardByIdService;
}
