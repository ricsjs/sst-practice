import { PrismaDocumentsRepository } from "../../../repositories/prisma/prisma-documents.repository";
import { FindDocumentByEmployeeId } from "../../document-services/find-document-by-employee-id";

export function makeFindDocumentsByEmployeeId() {
    const prismaDocumentsRepository = new PrismaDocumentsRepository;
    const findDocumentByEmployeeId = new FindDocumentByEmployeeId(prismaDocumentsRepository);

    return findDocumentByEmployeeId;
}