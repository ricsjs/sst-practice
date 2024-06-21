import { User } from "@prisma/client";
import { InvalidCredentialError } from "../errors/invalid-credential-error";
import { compare } from "bcryptjs";
import { UsersRepository } from "../../repositories/users-repository";

interface UserAuthenticateServiceRequest {
  email: string;
  password: string;
}

interface UserAuthenticateServiceResponse {
  user: User;
  userType: String;
}

export class UserAuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: UserAuthenticateServiceRequest): Promise<UserAuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialError();
    }

    if (user.password_hash === null) {
      throw new InvalidCredentialError();
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialError();
    }

    return {
      user,
      userType: user.type,
    };
  }
}
