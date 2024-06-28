import { Empregado } from "@prisma/client";
import { EmployeesRepository } from "../../repositories/employees-repository";

interface CreateEmployeeServiceRequest {
  name: string;
  cpf: string;
  nis: string;
  rg: string;
  pcd: string;
  pcd_observation: string;
  sex: string;
  dt_birth: Date;
  phone_number: string;
  admission_dt: Date;
  function_start_dt: Date;
  office: string;
  employee_function: string;
  registration: string;
  sector: string;
  cbo: string;
  companyId: string;
  unitId: string; // Utilize o campo correto para o relacionamento com a unidade
  active: boolean;
}

interface CreateEmployeeServiceResponse {
  employee: Empregado;
}

export class CreateEmployeeService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    name,
    cpf,
    nis,
    rg,
    pcd,
    pcd_observation,
    sex,
    dt_birth,
    phone_number,
    admission_dt,
    function_start_dt,
    office,
    employee_function,
    registration,
    sector,
    cbo,
    active,
    companyId,
    unitId, // Ajuste aqui para usar o campo correto
  }: CreateEmployeeServiceRequest): Promise<CreateEmployeeServiceResponse> {
    console.log("companyId:", companyId);
    console.log("unitId:", unitId);
    
    const employee = await this.employeesRepository.create({
      name,
      cpf,
      nis,
      rg,
      pcd,
      pcd_observation,
      sex,
      dt_birth,
      phone_number,
      admission_dt,
      function_start_dt,
      office,
      employee_function,
      registration,
      sector,
      cbo,
      active,
      company: { connect: { id: companyId } },
      unit: { connect: { id: unitId } }, 
    });

    return {
      employee,
    };
  }
}
