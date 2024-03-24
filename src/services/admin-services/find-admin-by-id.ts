import { Admin } from "@prisma/client";
import { AdminsRepository } from "../../repositories/admins-repository";

interface FetchAdminByIdServiceRequest {
  id: string;
}

interface FetchAdminByIdServiceResponse {
  admin: Admin | null;
}

export class FetchAdminByIdService {
  constructor(private adminRepository: AdminsRepository) {}

  async execute({
    id,
  }: FetchAdminByIdServiceRequest): Promise<FetchAdminByIdServiceResponse> {
    const admin = await this.adminRepository.findById(id);

    return {
      admin,
    };
  }
}
