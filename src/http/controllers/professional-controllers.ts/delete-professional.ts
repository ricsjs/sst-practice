import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteProfessionalService } from "../../../services/factories/professional-factories/make-delete-professional";

export async function deleteProfessional(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteProfessionalSchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = deleteProfessionalSchema.parse(request.params);

    const deleteProfessionalService = makeDeleteProfessionalService();

    await deleteProfessionalService.execute({ id });

    return reply.status(200).send({ message: "Professional successfully deleted." });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
