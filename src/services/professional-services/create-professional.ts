import { hash } from "bcryptjs"
import { Profissional } from "@prisma/client"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"
import { UsersRepository } from "../../repositories/users-repository"
import { ProfesssionalsRepository } from "../../repositories/professionals-repository"

interface CreateProfessionalServiceRequest {
    email: string
    password: string
    name: string
    cpf: string
    nis: string
    rg: string
    cbo: string
    formation: string
    organ: string
    acronym: string
    ccr: string
    uf: string
    title: string
    jobFunction: string
    active: boolean
}

interface CreateProfessionalServiceResponse {
    professional: Profissional
}

export class CreateProfessionalService {
    constructor(
        private professionalsRepository: ProfesssionalsRepository,
        private usersRepository: UsersRepository
    ) { }

    async execute({
        email, password, name, cpf, nis, rg, cbo, formation, organ, acronym, ccr, uf, title, jobFunction, active
    }: CreateProfessionalServiceRequest): Promise<CreateProfessionalServiceResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const userType = "professional"
        const userRole = "PROFESSIONAL"

        const user = await this.usersRepository.create({
            email,
            password_hash,
            type: userType,
            role: userRole
        })

        const professional = await this.professionalsRepository.create({
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
            function: jobFunction,
            active,
            user: { connect: { id: user.id } }
        })

        return {
            professional
        }
    }
}