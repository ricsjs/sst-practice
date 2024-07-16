import { prisma } from "../../lib/prisma";
import { DocumentsRepository } from "../documents-repository";

export class PrismaDocumentsRepository implements DocumentsRepository {
  FindDocumentsWithMedicalConfidentialityByEmployeeId(employeeId: string){
    const document = prisma.documents.findMany({
      where: {
        empregadoId: employeeId,
      },
    });

    return document;
  }
  async findDocumentByEmployeeId(employeeId: string) {
    const document = await prisma.documents.findMany({
      where: {
        medicalConfidentiality: false,
        empregadoId: employeeId,
      },
    });

    return document;
  }
}
