import { PrismaProfessionalsRepository } from "../../../repositories/prisma/prisma-professionals-repository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { UpdateProfessionalService } from "../../professional-services/update-professional";

export function makeUpdateProfessionalService() {
  const prismaProfessionalsRepository = new PrismaProfessionalsRepository();
  const prismaUsersRepository = new PrismaUsersRepository();

  const updateProfessionalService = new UpdateProfessionalService(prismaProfessionalsRepository, prismaUsersRepository);

  return updateProfessionalService;
}
