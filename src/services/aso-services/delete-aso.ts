import { AsosRepository } from "../../repositories/asos-repository";

interface DeleteAsoServiceRequest {
  id: string;
}

interface DeleteAsoServiceResponse {
  message: string;
}

export class DeleteAsoService {
  constructor(private asosRepository: AsosRepository) {}

  async execute({
    id,
  }: DeleteAsoServiceRequest): Promise<DeleteAsoServiceResponse> {
    try {
      await this.asosRepository.delete(id);
      return { message: "Aso successfully deleted." };
    } catch (error) {
      throw new Error("Error deleting aso: " + error);
    }
  }
}
