import { PrismaProfessionalsRepository } from "../../../repositories/prisma/prisma-professionals-repository";
import { FetchAllProfessionalsService } from "../../professional-services/fetch-all-professionals";

export function makeFetchAllProfessionalsService() {
  const prismaProfessionalsRepository = new PrismaProfessionalsRepository();
  const fetchAllProfessionalsService = new FetchAllProfessionalsService(prismaProfessionalsRepository);

  return fetchAllProfessionalsService;
}
