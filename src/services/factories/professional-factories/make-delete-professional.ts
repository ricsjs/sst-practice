import { PrismaProfessionalsRepository } from "../../../repositories/prisma/prisma-professionals-repository";
import { DeleteProfessionalService } from "../../professional-services/delete-professional";

export function makeDeleteProfessionalService() {
  const prismaProfessionalsRepository = new PrismaProfessionalsRepository();
  const deleteProfessionalService = new DeleteProfessionalService(prismaProfessionalsRepository);

  return deleteProfessionalService;
}
