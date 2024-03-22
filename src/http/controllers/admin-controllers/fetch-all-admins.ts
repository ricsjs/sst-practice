import { FastifyReply, FastifyRequest } from "fastify";
import { makeListAdminsService } from "../../../services/factories/admin-factories/make-fetch-all-admin";

export async function fetchAllAdmins(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listAdminsService = makeListAdminsService();

    const { admins } = await listAdminsService.execute();

    return reply.status(200).send({ admins });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
