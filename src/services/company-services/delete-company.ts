import { CompaniesRepository } from "../../repositories/companies-repository";

interface DeleteCompanyServiceRequest {
  id: string;
}

interface DeleteCompanyServiceResponse {
  message: string;
}

export class DeleteCompanyService {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute({
    id,
  }: DeleteCompanyServiceRequest): Promise<DeleteCompanyServiceResponse> {
    try {
      await this.companiesRepository.delete(id);
      return { message: "Company successfully deleted." };
    } catch (error) {
      throw new Error("Error deleting company: " + error);
    }
  }
}
