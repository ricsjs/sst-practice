import { Empresa } from "@prisma/client";
import { CompaniesRepository } from "../../repositories/companies-repository";

interface FetchAllCompaniesServiceRequest {
  companyId: string;
}

interface FetchAllCompaniesServiceResponse {
  companies: Empresa[];
}

export class FetchAllCompaniesService {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute({
    companyId,
  }: FetchAllCompaniesServiceRequest): Promise<FetchAllCompaniesServiceResponse> {
    const companies = await this.companiesRepository.findMany(companyId);

    return {
      companies,
    };
  }
}
