import { hash } from "bcryptjs"
import { AdminsRepository } from "../repositories/admins-repository"
import { throws } from "assert"
import { AdminAlreadyExistsError } from "./errors/admin-already-exists-error"
import { Admin } from "@prisma/client"

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
            throw new AdminAlreadyExistsError()
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