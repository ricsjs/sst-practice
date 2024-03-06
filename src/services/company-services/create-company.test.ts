import { describe, it, expect } from 'vitest'
import { compare } from 'bcryptjs'
import { beforeEach } from 'vitest'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { InMemoryCompaniesRepository } from '../../repositories/in-memory/in-memory-companies-repository'
import { CreateCompanyService } from './create-company'

let companiesRepository: InMemoryCompaniesRepository
let sut: CreateCompanyService

describe('Register Company Service', () => {
    beforeEach(() => {
        companiesRepository = new InMemoryCompaniesRepository
        sut = new CreateCompanyService(companiesRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            cnpj: '0101010101',
            corporate_reason: 'sjklajsklajslkja',
            fantasy_name: 'shuahsuahs',
            identification: 'shaushausa',
            cep: 'shaushauhs',
            address: 'shaushauhs',
            neighborhood: 'shaushauhs',
            phone: 'shaushauhs',
            dt_start_esocial: new Date(),
            email: 'ricfilho@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash company password upon registration', async () => {
        const { user } = await sut.execute({
            cnpj: '0101010101',
            corporate_reason: 'sjklajsklajslkja',
            fantasy_name: 'shuahsuahs',
            identification: 'shaushausa',
            cep: 'shaushauhs',
            address: 'shaushauhs',
            neighborhood: 'shaushauhs',
            phone: 'shaushauhs',
            dt_start_esocial: new Date(),
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
            cnpj: '0101010101',
            corporate_reason: 'sjklajsklajslkja',
            fantasy_name: 'shuahsuahs',
            identification: 'shaushausa',
            cep: 'shaushauhs',
            address: 'shaushauhs',
            neighborhood: 'shaushauhs',
            phone: 'shaushauhs',
            dt_start_esocial: new Date(),
            email,
            password: '123456'
        })

        await expect(() =>
            sut.execute({
                cnpj: '0101010101',
                corporate_reason: 'sjklajsklajslkja',
                fantasy_name: 'shuahsuahs',
                identification: 'shaushausa',
                cep: 'shaushauhs',
                address: 'shaushauhs',
                neighborhood: 'shaushauhs',
                phone: 'shaushauhs',
                dt_start_esocial: new Date(),
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
