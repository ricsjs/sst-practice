import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"

interface RegisterAdminServiceRequest {
    name: string,
    email: string,
    password: string
}

export class RegisterAdminService {
    constructor(private adminsRepository: any) {}

    async execute({
        name, email, password
    }: RegisterAdminServiceRequest) {
        const password_hash = await hash(password, 6)
    
        const adminWithSameEmail = await prisma.admin.findUnique({
            where: {
                email
            }
        })
    
        if (adminWithSameEmail) {
            throw new Error('Email already exists.')
        }
        
        await this.adminsRepository.create({
            name,
            email,
            password_hash
        })
    }
}