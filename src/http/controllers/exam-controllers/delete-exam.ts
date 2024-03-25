import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteExamService } from "../../../services/factories/exam-factories/make-delete-exam";

export async function deleteExam(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteExamSchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = deleteExamSchema.parse(request.params);

    const deleteExamService = makeDeleteExamService();

    await deleteExamService.execute({ id });

    return reply.status(200).send({ message: "Exam successfully deleted." });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
