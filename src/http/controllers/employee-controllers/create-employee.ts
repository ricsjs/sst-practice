import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateEmployeeService } from "../../../services/factories/employee-factories/make-create-employee-service";
import { UnableToRegisterError } from "../../../services/errors/unable-to-register-error";

export async function createEmployee(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createEmployeeSchema = z.object({
    companyId: z.string(),
    name: z.string(),
    cpf: z.string(),
    nis: z.string(),
    rg: z.string(),
    br_pdh: z.string(),
    sex: z.string(),
    dt_birth: z.coerce.date(),
    phone: z.string(),
    phone_number: z.string(),
    blood_type: z.string(),
  });

  const {
    companyId,
    name,
    cpf,
    nis,
    rg,
    br_pdh,
    sex,
    dt_birth,
    phone,
    phone_number,
    blood_type,
  } = createEmployeeSchema.parse(request.body);

  try {
    const createEmployeeService = makeCreateEmployeeService();

    await createEmployeeService.execute({
      companyId,
      name,
      cpf,
      nis,
      rg,
      br_pdh,
      sex,
      dt_birth,
      phone,
      phone_number,
      blood_type,
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
