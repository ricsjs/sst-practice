import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteAsoService } from "../../../services/factories/aso-factories/make-delete-aso";

export async function deleteAso(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteAsoSchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = deleteAsoSchema.parse(request.params);

    const deleteAsoService = makeDeleteAsoService();

    await deleteAsoService.execute({ id });

    return reply.status(200).send({ message: "Aso successfully deleted." });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
