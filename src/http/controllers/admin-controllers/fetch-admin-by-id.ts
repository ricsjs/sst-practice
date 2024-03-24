import { FastifyReply, FastifyRequest } from "fastify";
import { NoRecordsFoundError } from "../../../services/errors/no-records-found-error";
import { z } from "zod";
import { makeFetchAdminByIdService } from "../../../services/factories/admin-factories/make-fetch-admin-by-id";

export async function fetchAdminById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchAdminByIdSchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = fetchAdminByIdSchema.parse(request.params);

    const fetchAdminByIdService = makeFetchAdminByIdService();

    const { admin } = await fetchAdminByIdService.execute({ id });

    return reply.status(200).send({ admin });
  } catch (error) {
    if (error instanceof NoRecordsFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
