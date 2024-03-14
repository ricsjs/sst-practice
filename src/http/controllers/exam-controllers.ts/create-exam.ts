import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error"
import { makeCreateExamService } from "../../../services/factories/exam-factories/make-create-exam-service"
import { UnableToRegisterError } from "../../../services/errors/unable-to-register-error"

export async function createExam(request: FastifyRequest, reply: FastifyReply) {
    const createExamSchema = z.object({
        name: z.string(),
        date: z.coerce.date(),
        asoId: z.string(),
    })

    const { name, date, asoId } = createExamSchema.parse(request.body)

    try {

        const createEmployeeService = makeCreateExamService()

        await createEmployeeService.execute({
            name,
            date,
            asoId
        })
    } catch (error) {
        if (error instanceof UnableToRegisterError) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }

    return reply.status(201).send()
}