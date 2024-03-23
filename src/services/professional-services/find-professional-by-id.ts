import { Profissional } from "@prisma/client"
import { ProfesssionalsRepository } from "../../repositories/professionals-repository"

interface FetchProfessionalByIdServiceRequest {
    id: string
}

interface FetchProfessionalByIdServiceResponse {
    professional: Profissional | null
}

export class FetchProfessionalByIdService {
    constructor(
        private professionalsRepository: ProfesssionalsRepository,
    ) { }

    async execute({
        id
    }: FetchProfessionalByIdServiceRequest): Promise<FetchProfessionalByIdServiceResponse> {

        const professional = await this.professionalsRepository.findById(id)

        return {
            professional
        }
    }
}