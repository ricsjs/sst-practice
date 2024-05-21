import { prisma } from "../../lib/prisma";
import { DocumentsRepository } from "../documents-repository";

export class PrismaDocumentsRepository implements DocumentsRepository {
  async findDocumentByEmployeeId(employeeId: string) {
    const document = await prisma.documents.findMany({
      where: {
        empregadoId: employeeId
      }
    });

    return document;
  }
}
