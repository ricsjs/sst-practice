import { describe, it, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from '../errors/invalid-credential-error'
import { beforeEach } from 'vitest'
import { InMemoryCompaniesRepository } from '../../repositories/in-memory/in-memory-companies-repository'
import { CompanyAuthenticateService } from './company-authenticate'

let companiesRepository: InMemoryCompaniesRepository
let sut: CompanyAuthenticateService

describe('Auth Company Service', () => {
    beforeEach(() => {
        companiesRepository = new InMemoryCompaniesRepository
        sut = new CompanyAuthenticateService(companiesRepository)
    })
    it('should be able to authenticate', async () => {
        await companiesRepository.create({
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
            password_hash: await hash('123456', 6)
        })

        const { company } = await sut.execute({
            email: 'ricfilho@gmail.com',
            password: '123456'
        })

        expect(company.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        expect(() =>
            sut.execute({
                email: 'ricfilho@gmail.com',
                password: '123456'
            })).rejects.toBeInstanceOf(InvalidCredentialError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await companiesRepository.create({
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
            password_hash: await hash('123456', 6)
        })

        expect(() => 
            sut.execute({
                email: 'ricfilho@gmail.com',
                password: '123123'
            })).rejects.toBeInstanceOf(InvalidCredentialError)
    })
})
