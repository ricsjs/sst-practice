import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllExamsService } from "../../../services/factories/exam-factories/make-fetch-all-exams";

export async function fetchAllExams(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchAllExamsService = makeFetchAllExamsService();

    const { exams } = await fetchAllExamsService.execute();

    return reply.status(200).send({ exams });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
