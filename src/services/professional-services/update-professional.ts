import { Profissional } from "@prisma/client";
import { ProfesssionalsRepository } from "../../repositories/professionals-repository";

interface UpdateProfessionalServiceRequest {
    id: string;
    userId: string;
    name: string;
    cpf: string;
    nis: string;
    rg: string;
    cbo: string;
    formation: string;
    organ: string;
    acronym: string;
    ccr: string;
    uf: string;
    title: string;
    professionalFunction: string
    active: boolean
}

interface UpdateProfessionalServiceResponse {
    professional: Profissional
}
export class UpdateProfessionalService {
    constructor(private professionalsRepository: ProfesssionalsRepository) { }

    async execute({
        id,
        userId,
        name,
        cpf,
        nis,
        rg,
        cbo,
        formation,
        organ,
        acronym,
        ccr,
        uf,
        title,
        professionalFunction,
        active
    }: UpdateProfessionalServiceRequest): Promise<UpdateProfessionalServiceResponse> {
        try {
            const updatedProfessional = await this.professionalsRepository.update({
                id,
                userId,
                name,
                cpf,
                nis,
                rg,
                cbo,
                formation,
                organ,
                acronym,
                ccr,
                uf,
                title,
                function: professionalFunction,
                active
            });

            return { professional: updatedProfessional };
        } catch (error) {
            throw new Error("Error updating professional: " + error);
        }
    }
}
