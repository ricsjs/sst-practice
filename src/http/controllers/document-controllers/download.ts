import { FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "../../../lib/cloudflare";

export const downloadDocument = async (request: FastifyRequest) => {
  const getFileParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getFileParamsSchema.parse(request.params)

  const file = await prisma.documents.findUniqueOrThrow({
    where: {
      id,
    }
  })

  const signedUrl = await getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: 'sst-practice-dev',
      Key: file.key,
    }),
    { expiresIn: 600 },
  )

  return { signedUrl };
}
