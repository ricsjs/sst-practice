import { Admin } from "@prisma/client"
import { AdminsRepository } from "../../repositories/admins-repository"

interface FindAdminByUserIdRequest {
    userId: string
}

interface FindAdminByUserIdResponse {
    admin: Admin | null
}

export class FindAdminByUserId {
    constructor(
        private adminsRepository: AdminsRepository,
    ) { }

    async execute({
        userId
    }: FindAdminByUserIdRequest): Promise<FindAdminByUserIdResponse> {

        const admin = await this.adminsRepository.findByUserId(userId)

        return {
            admin
        }
    }
}