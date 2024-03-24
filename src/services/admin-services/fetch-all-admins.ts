import { Admin, Empresa } from "@prisma/client";
import { CompaniesRepository } from "../../repositories/companies-repository";
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
