import { Profissional } from "@prisma/client";
import { ProfesssionalsRepository } from "../../repositories/professionals-repository";
import { UsersRepository } from "../../repositories/users-repository";
import { hash } from "bcryptjs";

interface UpdateProfessionalServiceRequest {
    id: string;
    userId: string;
    name: string;
    email: string,
    password?: string,
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
    constructor(
        private professionalsRepository: ProfesssionalsRepository,
        private usersRepository: UsersRepository
    ) { }

    async execute({
        id,
        userId,
        name,
        email,
        password,
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

            const user = await this.usersRepository.findById(userId);

            if (!user) {
                throw new Error("User not found!");
            }

            if (password) {
                const hashedPassword = await hash(password, 6);
                await this.usersRepository.update({
                    id: user.id,
                    email,
                    password_hash: hashedPassword,
                    type: "professional"
                })
            }

            if (!password) {
                await this.usersRepository.update({
                    id: user.id,
                    email,
                    password_hash: user.password_hash,
                    type: "professional"
                })
            }

            const oldProfessional = await this.professionalsRepository.findByUserId(userId);

            const updatedProfessional = await this.professionalsRepository.update({
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
                active,
                id: oldProfessional!.id,
                userId: user.id
            });

            return { professional: updatedProfessional };
        } catch (error) {
            throw new Error("Error updating professional: " + error);
        }
    }
}
