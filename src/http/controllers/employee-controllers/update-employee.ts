import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error";
import { makeUpdateEmployeesService } from "../../../services/factories/employee-factories/make-update-employee-service";
import { customDateSchema } from "../../../../utils/convert-date";

export async function updateEmployees(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateEmployeesBodySchema = z.object({
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
    companyId: z.string(),
  });

  const updateEmployeesParamSchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = updateEmployeesParamSchema.parse(request.params);

    const {
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
      companyId,
    } = updateEmployeesBodySchema.parse(request.body);

    console.log("Received data:", request.body); // Adicionando log para depuração

    const updateEmployeeService = makeUpdateEmployeesService();

    await updateEmployeeService.execute({
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
      companyId,
      active: true,
    });

    return reply
      .status(200)
      .send({ message: "Employee successfully updated." });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
