import { describe, it, expect } from 'vitest'
import { RegisterAdminService } from './register-admin'
import { compare } from 'bcryptjs'
import { InMemoryAdminsRepository } from '../repositories/in-memory/in-memory-admins-repository'
import { AdminAlreadyExistsError } from './errors/admin-already-exists-error'
import { beforeEach } from 'vitest'

let adminsRepository: InMemoryAdminsRepository
let sut: RegisterAdminService

describe('Register Admin Service', () => {
    beforeEach(() => {
        adminsRepository = new InMemoryAdminsRepository
        sut = new RegisterAdminService(adminsRepository)
    })
    
    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'Ricardo Alencar',
            email: 'ricfilho@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash admin password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'Ricardo Alencar',
            email: 'ricfilho@gmail.com',
            password: '123456'
        })

        const isPassCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPassCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const email = 'ricfilho0007@gmail.com'

        await sut.execute({
            name: 'Ricardo Alencar',
            email,
            password: '123456'
        })

        await expect(() =>
            sut.execute({
                name: 'Ricardo',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AdminAlreadyExistsError)
    })
})
