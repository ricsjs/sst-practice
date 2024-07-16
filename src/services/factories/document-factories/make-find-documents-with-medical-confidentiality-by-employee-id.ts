import { PrismaDocumentsRepository } from "../../../repositories/prisma/prisma-documents.repository";
import { FindDocumentsWithMedicalConfidentialityByEmployeeId } from "../../document-services/find-documents-with-medical confidentiality-by-employee-id";

export function makeFindDocumentsWithMedicalConfidentialityByEmployeeId() {
    const prismaDocumentsRepository = new PrismaDocumentsRepository;
    const findDocumentsWithMedicalConfidentialityByEmployeeId = new FindDocumentsWithMedicalConfidentialityByEmployeeId(prismaDocumentsRepository);

    return findDocumentsWithMedicalConfidentialityByEmployeeId;
}