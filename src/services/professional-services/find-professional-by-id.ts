import { Profissional } from "@prisma/client"
import { ExamsRepository } from "../../repositories/exams-repository"
import { ProfesssionalsRepository } from "../../repositories/professionals-repository"

interface FindProfessionalByIdServiceRequest {
    id: string
}

interface FindProfessionalByIdServiceResponse {
    professional: Profissional | null
}

export class FindProfessionalByIdService {
    constructor(
        private professionalsRepository: ProfesssionalsRepository,
    ) { }

    async execute({
        id
    }: FindProfessionalByIdServiceRequest): Promise<FindProfessionalByIdServiceResponse> {

        const professional = await this.professionalsRepository.findById(id)

        return {
            professional
        }
    }
}