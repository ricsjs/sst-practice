import { describe, it, expect } from 'vitest'
import { InMemoryAdminsRepository } from '../repositories/in-memory/in-memory-admins-repository'
import { AdminAuthenticateService } from './admin-authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from './errors/invalid-credential-error'

describe('Register Admin Service', () => {
    it('should be able to authenticate', async () => {
        const adminsRepository = new InMemoryAdminsRepository
        const sut = new AdminAuthenticateService(adminsRepository)

        await adminsRepository.create({
            name: 'John Doe',
            email: 'ricfilho@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { admin } = await sut.execute({
            email: 'ricfilho@gmail.com',
            password: '123456'
        })

        expect(admin.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        const adminsRepository = new InMemoryAdminsRepository
        const sut = new AdminAuthenticateService(adminsRepository)

        expect(() =>
            sut.execute({
                email: 'ricfilho@gmail.com',
                password: '123456'
            })).rejects.toBeInstanceOf(InvalidCredentialError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const adminsRepository = new InMemoryAdminsRepository
        const sut = new AdminAuthenticateService(adminsRepository)

        await adminsRepository.create({
            name: 'John Doe',
            email: 'ricfilho@gmail.com',
            password_hash: await hash('123456', 6)
        })

        expect(() => 
            sut.execute({
                email: 'ricfilho@gmail.com',
                password: '123123'
            })).rejects.toBeInstanceOf(InvalidCredentialError)
    })
})
