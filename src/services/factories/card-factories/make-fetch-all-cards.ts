import { PrismaCardsRepository } from "../../../repositories/prisma/prisma-cards-repository";
import { FetchAllCardsService } from "../../card-services/fetch-all-cards";

export function makeFetchAllCardsService() {
  const prismaCardsRepository = new PrismaCardsRepository();
  const fetchAllCardsService = new FetchAllCardsService(prismaCardsRepository);

  return fetchAllCardsService;
}
