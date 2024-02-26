import { hash } from "bcryptjs"
import { AdminsRepository } from "../repositories/admins-repository"
import { throws } from "assert"
import { AdminAlreadyExistsError } from "./errors/admin-already-exists-error"

interface RegisterAdminServiceRequest {
    name: string,
    email: string,
    password: string
}

export class RegisterAdminService {
    constructor(private adminsRepository: AdminsRepository) {}

    async execute({
        name, email, password
    }: RegisterAdminServiceRequest) {
        const password_hash = await hash(password, 6)
    
        const adminWithSameEmail = await this.adminsRepository.findByEmail(email)
    
        if (adminWithSameEmail) {
            throw new AdminAlreadyExistsError()
        }
        
        await this.adminsRepository.create({
            name,
            email,
            password_hash
        })
    }
}