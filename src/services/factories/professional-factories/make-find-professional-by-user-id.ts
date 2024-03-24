import { PrismaProfessionalsRepository } from "../../../repositories/prisma/prisma-professionals-repository";
import { FindProfessionalByUserId } from "../../professional-services/find-professional-by-user-id";

export function makeFindProfessionalByUserIdService() {
  const prismaProfessionalsRepository = new PrismaProfessionalsRepository();
  const findProfessionalByUserId = new FindProfessionalByUserId(prismaProfessionalsRepository);

  return findProfessionalByUserId;
}
