import { Documents } from "@prisma/client"
import { DocumentsRepository } from "../../repositories/documents-repository"

interface FindDocumentsWithMedicalConfidentialityByEmployeeIdRequest {
    employeeId: string
}

interface FindDocumentsWithMedicalConfidentialityByEmployeeIdResponse {
    document: Documents[] | null
}

export class FindDocumentsWithMedicalConfidentialityByEmployeeId {
    constructor(
        private documentsRepository: DocumentsRepository,
    ) { }

    async execute({
        employeeId
    }: FindDocumentsWithMedicalConfidentialityByEmployeeIdRequest): Promise<FindDocumentsWithMedicalConfidentialityByEmployeeIdResponse> {

        const document = await this.documentsRepository.FindDocumentsWithMedicalConfidentialityByEmployeeId(employeeId)

        return {
            document
        }
    }
}