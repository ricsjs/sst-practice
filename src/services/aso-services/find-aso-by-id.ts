import { Aso } from "@prisma/client";
import { AsosRepository } from "../../repositories/asos-repository";

interface FetchAsoByIdServiceRequest {
  id: string;
}

interface FetchAsoByIdServiceResponse {
  aso: Aso | null;
}

export class FetchAsoByIdService {
  constructor(private asosRepository: AsosRepository) {}

  async execute({
    id,
  }: FetchAsoByIdServiceRequest): Promise<FetchAsoByIdServiceResponse> {
    const aso = await this.asosRepository.findById(id);

    return {
      aso,
    };
  }
}
