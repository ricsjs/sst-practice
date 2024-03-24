import { Profissional } from "@prisma/client"
import { ProfesssionalsRepository } from "../../repositories/professionals-repository"

interface FindProfessionalByUserIdRequest {
    userId: string
}

interface FindProfessionalByUserIdResponse {
    professional: Profissional | null
}

export class FindProfessionalByUserId {
    constructor(
        private professionalsRepository: ProfesssionalsRepository,
    ) { }

    async execute({
        userId
    }: FindProfessionalByUserIdRequest): Promise<FindProfessionalByUserIdResponse> {

        const professional = await this.professionalsRepository.findByUserId(userId)

        return {
            professional
        }
    }
}