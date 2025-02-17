import { Documents } from "@prisma/client";

export interface DocumentsRepository {
  findDocumentByEmployeeId(employeeId: string): Promise<Documents[]>
  FindDocumentsWithMedicalConfidentialityByEmployeeId(employeeId: string): Promise<Documents[]>
}
