import { Empregado } from "@prisma/client";
import { EmployeesRepository } from "../../repositories/employees-repository";

interface UpdateEmployeeServiceRequest {
  id: string;
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
  unitId: string;
  active: boolean;
}

interface UpdateEmployeeServiceResponse {
  employee: Empregado;
}

export class UpdateEmployeesService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    id,
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
    unitId,
  }: UpdateEmployeeServiceRequest): Promise<UpdateEmployeeServiceResponse> {
    try {
      const updatedEmployee = await this.employeesRepository.update({
        id,
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
        unidadeId: unitId
      });

      return { employee: updatedEmployee };
    } catch (error) {
      throw new Error("Error updating employee: " + error);
    }
  }
}
