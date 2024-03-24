import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileService } from "../../services/factories/user-factories/make-get-user-profile-service";
import { makeFindProfessionalByUserIdService } from "../../services/factories/professional-factories/make-find-professional-by-user-id";
import { makeFindAdminByUserIdService } from "../../services/factories/admin-factories/make-find-admin-by-user-id";
import { makeFindCompanyByUserIdService } from "../../services/factories/company-factories/make-find-company-by-user-id";
import { ResourceNotFoundError } from "../../services/errors/resource-not-found-error";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const getUserProfile = makeGetUserProfileService()

    const { user } = await getUserProfile.execute({
        userId: request.user.sub
    })

    const userId = user.id

    const switchUser = async () => {
        switch (user.type) {
            case "admin":
                const findAdminByUserId = makeFindAdminByUserIdService()
                const admin = await findAdminByUserId.execute({ userId })

                return admin
            case "professional":
                const findProfessionalByUserIdService = makeFindProfessionalByUserIdService()
                const professional = await findProfessionalByUserIdService.execute({ userId })

                return professional
            case "company":
                const findCompanyByUserIdService = makeFindCompanyByUserIdService()
                const company = await findCompanyByUserIdService.execute({ userId })

                return company

            default:
                return new ResourceNotFoundError()
        }
    }

    const switchedUser = await switchUser()

    return reply.status(200).send({
        user,
        switchedUser
    })
}