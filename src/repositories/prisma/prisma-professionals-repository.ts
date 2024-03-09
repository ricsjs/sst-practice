import { prisma } from "../../lib/prisma"
import { Prisma } from "@prisma/client"
import { ProfesssionalsRepository } from "../professionals-repository"

export class PrismaProfessionalsRepository implements ProfesssionalsRepository {
    async create(data: Prisma.ProfissionalCreateInput) {
        const professional = await prisma.profissional.create({
            data,
        })

        return professional
    }
}