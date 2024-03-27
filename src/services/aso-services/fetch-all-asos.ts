import { Aso } from "@prisma/client";
import { AsosRepository } from "../../repositories/asos-repository";

interface FetchAllAsosServiceRequest {
  companyId: string
}

interface FetchAllAsosServiceResponse {
  asos: Aso[];
}

export class FetchAllAsosService {
  constructor(private asosRepository: AsosRepository) { }

  async execute({
    companyId
  }: FetchAllAsosServiceRequest): Promise<FetchAllAsosServiceResponse> {
    const asos = await this.asosRepository.findMany(companyId);

    return {
      asos,
    };
  }
}
