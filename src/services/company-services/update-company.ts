import { Empresa } from "@prisma/client";
import { CompaniesRepository } from "../../repositories/companies-repository";
import { UsersRepository } from "../../repositories/users-repository";
import { hash } from "bcryptjs";

interface UpdateCompanyServiceRequest {
  id: string;
  userId: string;
  email: string;
  password?: string;
  cnpj: string;
  corporate_reason: string;
  fantasy_name: string;
  identification: string;
  cep: string;
  address: string;
  neighborhood: string;
  phone: string;
  dt_start_esocial: Date;
  active: boolean;
}

interface UpdateCompanyServiceResponse {
  company: Empresa;
}
export class UpdateCompanyService {
  constructor(
    private companiesRepository: CompaniesRepository,
    private usersRepository: UsersRepository
  ) { }

  async execute({
    userId,
    email,
    password,
    cnpj,
    corporate_reason,
    fantasy_name,
    identification,
    cep,
    address,
    neighborhood,
    phone,
    dt_start_esocial,
    active,
  }: UpdateCompanyServiceRequest): Promise<UpdateCompanyServiceResponse> {
    try {
      console.log("passando aqui")

      console.log("this.usersRepository:", this.usersRepository);
      
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
          type: "company"
        })
      }

      if (!password) {
        await this.usersRepository.update({
          id: user.id,
          email,
          password_hash: user.password_hash,
          type: "company"
        })
      }

      const oldCompany = await this.companiesRepository.findByUserId(user.id);

      const updatedCompany = await this.companiesRepository.update({
        cnpj,
        corporate_reason,
        fantasy_name,
        identification,
        cep,
        address,
        neighborhood,
        phone,
        dt_start_esocial,
        active,
        id: oldCompany!.id,
        userId: user.id,
      });

      return { company: updatedCompany };
    } catch (error) {
      console.log("erro buceta", error)
      throw new Error("Error updating company: " + error);
    }
  }
}
