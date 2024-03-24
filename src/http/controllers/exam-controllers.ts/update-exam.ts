import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateExamService } from "../../../services/factories/exam-factories/make-update-exam";

export async function updateExam(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateExamBodySchema = z.object({
    name: z.string(),
    date: z.coerce.date(),
    asoId: z.string()
  });

  const updateExamParamSchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = updateExamParamSchema.parse(request.params);

    const {
      name,
      date,
      asoId
    } = updateExamBodySchema.parse(request.body);

    const updateExamService = makeUpdateExamService();

    await updateExamService.execute({
      id,
      name,
      date,
      asoId
    });

    return reply.status(200).send({ message: "Exam successfully updated." });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
