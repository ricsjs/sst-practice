import { Admin } from "@prisma/client";
import { AdminsRepository } from "../repositories/admins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetAdminProfileServiceServiceRequest {
    userId: string
}

interface GetAdminProfileServiceServiceResponse {
    admin: Admin
}

export class GetAdminProfileService {
    constructor(
        private adminsRepository: AdminsRepository
    ) {}

    async execute({ userId }: GetAdminProfileServiceServiceRequest): Promise<GetAdminProfileServiceServiceResponse> {
        const admin = await this.adminsRepository.findById(userId)

        if (!admin) {
            throw new ResourceNotFoundError()
        }

        return {
            admin
        }
    }
}