import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateEmployeeService } from "../../../services/factories/employee-factories/make-create-employee-service";
import { UnableToRegisterError } from "../../../services/errors/unable-to-register-error";
import { customDateSchema } from "../../../../utils/convert-date";

export async function createEmployee(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createEmployeeSchema = z.object({
    companyId: z.string(),
    unitId: z.string(),
    name: z.string(),
    cpf: z.string(),
    nis: z.string(),
    rg: z.string(),
    pcd: z.string(),
    pcd_observation: z.string(),
    sex: z.string(),
    dt_birth: customDateSchema,
    phone_number: z.string(),
    admission_dt: customDateSchema,
    function_start_dt: customDateSchema,
    office: z.string(),
    employee_function: z.string(),
    registration: z.string(),
    sector: z.string(),
    cbo: z.string(),
  });

  const {
    companyId,
    unitId,
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
  } = createEmployeeSchema.parse(request.body);

  console.log("Parsed companyId:", companyId);
  console.log("Parsed unitId:", unitId);

  try {
    const createEmployeeService = makeCreateEmployeeService();

    await createEmployeeService.execute({
      companyId,
      unitId,
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
      active: true,
    });
  } catch (error) {
    if (error instanceof UnableToRegisterError) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
