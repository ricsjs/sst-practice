import { PrismaProfessionalsRepository } from "../../../repositories/prisma/prisma-professionals-repository";
import { FetchProfessionalByIdService } from "../../professional-services/find-professional-by-id";

export function makeFetchProfessionalByIdService() {
  const prismaProfessionalsRepository = new PrismaProfessionalsRepository();
  const fetchProfessionalByIdService = new FetchProfessionalByIdService(prismaProfessionalsRepository);

  return fetchProfessionalByIdService;
}
