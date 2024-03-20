import { Empresa } from "@prisma/client";
import { CompaniesRepository } from "../../repositories/companies-repository";

interface FetchAllCompaniesServiceResponse {
  companies: Empresa[];
}

export class FetchAllCompaniesService {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(): Promise<FetchAllCompaniesServiceResponse> {
    const companies = await this.companiesRepository.findMany();

    return {
      companies,
    };
  }
}
