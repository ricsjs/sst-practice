import { hash } from "bcryptjs"
import { Admin } from "@prisma/client"
import { AdminsRepository } from "../../repositories/admins-repository"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"
import { UsersRepository } from "../../repositories/users-repository"

interface CreateAdminServiceRequest {
    name: string,
    email: string,
    password: string
}

interface CreateAdminServiceResponse {
    admin: Admin
}

export class CreateAdminService {
    constructor(
        private adminsRepository: AdminsRepository,
        private usersRepository: UsersRepository
    ) { }

    async execute({
        name, email, password
    }: CreateAdminServiceRequest): Promise<CreateAdminServiceResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const userType = "admin"

        const user = await this.usersRepository.create({
            email,
            password_hash,
            type: userType
        })

        const admin = await this.adminsRepository.create({
            name,
            user: { connect: { id: user.id } }
        })

        return {
            admin
        }
    }
}