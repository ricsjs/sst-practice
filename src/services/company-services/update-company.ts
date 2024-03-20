import { Empresa } from "@prisma/client";
import { CompaniesRepository } from "../../repositories/companies-repository";

interface UpdateCompanyServiceRequest {
  id: string;
  userId: string;
  cnpj: string;
  corporate_reason: string;
  fantasy_name: string;
  identification: string;
  cep: string;
  address: string;
  neighborhood: string;
  phone: string;
  dt_start_esocial: Date;
  active: boolean;
}

interface UpdateCompanyServiceResponse {
  company: Empresa;
}
export class UpdateCompanyService {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute({
    id,
    userId,
    cnpj,
    corporate_reason,
    fantasy_name,
    identification,
    cep,
    address,
    neighborhood,
    phone,
    dt_start_esocial,
    active,
  }: UpdateCompanyServiceRequest): Promise<UpdateCompanyServiceResponse> {
    try {
      const updatedCompany = await this.companiesRepository.update({
        cnpj,
        corporate_reason,
        fantasy_name,
        identification,
        cep,
        address,
        neighborhood,
        phone,
        dt_start_esocial,
        active,
        id,
        userId,
      });

      return { company: updatedCompany };
    } catch (error) {
      throw new Error("Error updating company: " + error);
    }
  }
}
