import { Admin } from "@prisma/client";
import { AdminsRepository } from "../../repositories/admins-repository";
import { InvalidCredentialError } from "../errors/invalid-credential-error";
import { compare } from "bcryptjs";

interface AdminAuthenticateServiceRequest {
    email: string
    password: string
}

interface AdminAuthenticateServiceResponse {
    admin: Admin
}

export class AdminAuthenticateService {
    constructor(
        private adminsRepository: AdminsRepository
    ) {}

    async execute({ email, password }: AdminAuthenticateServiceRequest): Promise<AdminAuthenticateServiceResponse> {
        const admin = await this.adminsRepository.findByEmail(email)

        if (!admin) {
            throw new InvalidCredentialError()
        }

        const doesPasswordMatches = await compare(password, admin.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialError()
        }

        return {
            admin
        }
    }
}