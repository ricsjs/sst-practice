import { Aso } from "@prisma/client";
import { AsosRepository } from "../../repositories/asos-repository";

interface FetchAllAsosServiceResponse {
  asos: Aso[];
}

export class FetchAllAsosService {
  constructor(private asosRepository: AsosRepository) {}

  async execute(): Promise<FetchAllAsosServiceResponse> {
    const asos = await this.asosRepository.findMany();

    return {
        asos,
    };
  }
}
