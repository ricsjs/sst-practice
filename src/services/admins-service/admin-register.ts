import { hash } from "bcryptjs"
import { Admin } from "@prisma/client"
import { AdminsRepository } from "../../repositories/admins-repository"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"

interface RegisterAdminServiceRequest {
    name: string,
    email: string,
    password: string
}

interface RegisterAdminServiceResponse {
    user: Admin
}

export class RegisterAdminService {
    constructor(private adminsRepository: AdminsRepository) {}

    async execute({
        name, email, password
    }: RegisterAdminServiceRequest): Promise<RegisterAdminServiceResponse> {
        const password_hash = await hash(password, 6)
    
        const adminWithSameEmail = await this.adminsRepository.findByEmail(email)
    
        if (adminWithSameEmail) {
            throw new UserAlreadyExistsError()
        }
        
        const user = await this.adminsRepository.create({
            name,
            email,
            password_hash
        })

        return {
            user
        }
    }
}