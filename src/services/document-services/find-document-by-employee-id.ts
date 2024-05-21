import { Documents } from "@prisma/client"
import { DocumentsRepository } from "../../repositories/documents-repository"

interface FindDocumentByEmployeeIdRequest {
    employeeId: string
}

interface FindDocumentByEmployeeIdResponse {
    document: Documents[] | null
}

export class FindDocumentByEmployeeId {
    constructor(
        private documentsRepository: DocumentsRepository,
    ) { }

    async execute({
        employeeId
    }: FindDocumentByEmployeeIdRequest): Promise<FindDocumentByEmployeeIdResponse> {

        const document = await this.documentsRepository.findDocumentByEmployeeId(employeeId)

        return {
            document
        }
    }
}