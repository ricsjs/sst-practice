import { Admin } from "@prisma/client";
import { AdminsRepository } from "../../repositories/admins-repository";

interface FetchAllAdminsServiceResponse {
  admins: Admin[];
}

export class FetchAllAdminsService {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute(): Promise<FetchAllAdminsServiceResponse> {
    const admins = await this.adminsRepository.findMany();

    return {
      admins,
    };
  }
}
