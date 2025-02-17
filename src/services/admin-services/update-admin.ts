import { Admin } from "@prisma/client";
import { AdminsRepository } from "../../repositories/admins-repository";
import { hash } from "bcryptjs";
import { UsersRepository } from "../../repositories/users-repository";

interface UpdateAdminServiceRequest {
  userId: string;
  name: string;
  email: string;
  cpf: string;
  phone_number: string;
  password?: string;
}

interface UpdateAdminServiceResponse {
  admin: Admin;
}
export class UpdateAdminService {
  constructor(
    private adminsRepository: AdminsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    name,
    email,
    cpf,
    phone_number,
    password,
  }: UpdateAdminServiceRequest): Promise<UpdateAdminServiceResponse> {
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
          type: "admin",
        });
      }

      if (!password) {
        await this.usersRepository.update({
          id: user.id,
          email,
          password_hash: user.password_hash,
          type: "admin",
        });
      }

      const oldAdmin = await this.adminsRepository.findByUserId(user.id);

      const updatedAdmin = await this.adminsRepository.update({
        name,
        cpf,
        phone_number,
        userId: user.id,
        id: oldAdmin!.id,
      });

      return { admin: updatedAdmin };
    } catch (error) {
      throw new Error("Error updating admin: " + error);
    }
  }
}
