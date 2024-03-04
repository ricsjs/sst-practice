import { describe, it, expect } from 'vitest'
import { InMemoryAdminsRepository } from '../../repositories/in-memory/in-memory-admins-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from '../errors/invalid-credential-error'
import { beforeEach } from 'vitest'
import { GetAdminProfileService } from './get-admin-profile'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let adminsRepository: InMemoryAdminsRepository
let sut: GetAdminProfileService

describe('Get Admin Profile Service', () => {
    beforeEach(() => {
        adminsRepository = new InMemoryAdminsRepository
        sut = new GetAdminProfileService(adminsRepository)
    })
    it('should be able to get user profile', async () => {
        const createdAdmin = await adminsRepository.create({
            name: 'John Doe',
            email: 'ricfilho@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { admin } = await sut.execute({
            userId: createdAdmin.id
        })

        expect(admin.id).toEqual(expect.any(String))
    })

    it('should not be able to get admin profile with wrong id', async () => {
        expect(() =>
            sut.execute({
                userId: 'non-existing-id'
            })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
