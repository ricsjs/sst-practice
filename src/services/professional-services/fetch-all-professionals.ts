import { Profissional } from "@prisma/client"
import { ExamsRepository } from "../../repositories/exams-repository"
import { ProfesssionalsRepository } from "../../repositories/professionals-repository";

interface FetchAllProfessionalsServiceResponse {
    professionals: Profissional[]
}

export class FetchAllProfessionalsService {
    constructor(private professionalsRepository: ProfesssionalsRepository) {}

    async execute(): Promise<FetchAllProfessionalsServiceResponse> {

        const professionals = await this.professionalsRepository.findMany();

        return {
            professionals
        }
    }
}