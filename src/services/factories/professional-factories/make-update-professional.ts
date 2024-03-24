import { PrismaProfessionalsRepository } from "../../../repositories/prisma/prisma-professionals-repository";
import { UpdateProfessionalService } from "../../professional-services/update-professional";

export function makeUpdateProfessionalService() {
  const prismaProfessionalsRepository = new PrismaProfessionalsRepository();
  const updateProfessionalService = new UpdateProfessionalService(prismaProfessionalsRepository);

  return updateProfessionalService;
}
