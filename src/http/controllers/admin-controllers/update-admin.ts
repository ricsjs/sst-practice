import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateAdminService } from "../../../services/factories/admin-factories/make-update-admin";

export async function updateAdmin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateAdminBodySchema = z.object({
    userId: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).optional(),
  });

  try {
    const { userId, name, email, password } = updateAdminBodySchema.parse(
      request.body
    );

    const updateAdminService = makeUpdateAdminService();

    await updateAdminService.execute({
      userId,
      name,
      email,
      password,
    });

    return reply.status(200).send({ message: "Admin successfully updated." });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
