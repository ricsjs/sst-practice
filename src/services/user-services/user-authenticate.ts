import { User } from "@prisma/client";
import { AdminsRepository } from "../../repositories/admins-repository";
import { InvalidCredentialError } from "../errors/invalid-credential-error";
import { compare } from "bcryptjs";
import { UsersRepository } from "../../repositories/users-repository";

interface UserAuthenticateServiceRequest {
    email: string
    password: string
}

interface UserAuthenticateServiceResponse {
    user: User
    userType: String
}

export class UserAuthenticateService {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({ email, password }: UserAuthenticateServiceRequest): Promise<UserAuthenticateServiceResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialError()
        }

        return {
            user,
            userType: user.type
        }
    }
}