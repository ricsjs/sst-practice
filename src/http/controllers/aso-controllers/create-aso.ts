import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UnableToRegisterError } from "../../../services/errors/unable-to-register-error"
import { makeCreateAsoService } from "../../../services/factories/aso-factories/make-create-aso-service"

export async function createAso(request: FastifyRequest, reply: FastifyReply) {
    const createAsoSchema = z.object({
        companyId: z.string(),
        employeeId: z.string(),
        physical_occupational_risk: z.string(),
        chemical_occupational_risk: z.string(),
        biological_occupational_risk: z.string(),
        occupational_risk_of_accidents: z.string(),
        ergonomic_occupational_risk: z.string(),
        work_at_height: z.string(),
        selfpropelled_machines: z.string(),
        working_with_firearms: z.string(),
        confined_space: z.string(),
        food_handling: z.string(),
        electrical_installations_and_services: z.string(),
        observation: z.string(),
        conclusion: z.string(),
        doctor_responsible: z.string(),
        local: z.string(),
        date: z.coerce.date(),
        examining_doctor_fullname: z.string(),
        examining_doctor_function: z.string(),
        examining_doctor_crm: z.string(),
        technical_manager_fullname: z.string(),
        technical_manager_function: z.string(),
        technical_manager_crm: z.string()
    })

    const { companyId, employeeId, physical_occupational_risk, chemical_occupational_risk, biological_occupational_risk, occupational_risk_of_accidents, ergonomic_occupational_risk, work_at_height, selfpropelled_machines,
        working_with_firearms, confined_space, food_handling, electrical_installations_and_services, observation, conclusion, doctor_responsible, local, date, examining_doctor_fullname, examining_doctor_function, examining_doctor_crm,
        technical_manager_fullname, technical_manager_function, technical_manager_crm } = createAsoSchema.parse(request.body)

    try {

        const createAsoService = makeCreateAsoService()

        await createAsoService.execute({
            companyId,
            employeeId,
            physical_occupational_risk,
            chemical_occupational_risk,
            biological_occupational_risk,
            occupational_risk_of_accidents,
            ergonomic_occupational_risk,
            work_at_height,
            selfpropelled_machines,
            working_with_firearms,
            confined_space,
            food_handling,
            electrical_installations_and_services,
            observation,
            conclusion,
            doctor_responsible,
            local,
            date,
            examining_doctor_fullname,
            examining_doctor_function,
            examining_doctor_crm,
            technical_manager_fullname,
            technical_manager_function,
            technical_manager_crm
        })
    } catch (error) {
        if (error instanceof UnableToRegisterError) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }

    return reply.status(201).send()
}