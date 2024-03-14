import { Aso } from "@prisma/client"
import { AsosRepository } from "../../repositories/asos-repository"

interface CreateAsoServiceRequest {
    companyId: string
    employeeId: string

    // occupational risks
    physical_occupational_risk: string
    chemical_occupational_risk: string
    biological_occupational_risk: string
    occupational_risk_of_accidents: string
    ergonomic_occupational_risk: string

    // critical activities
    work_at_height: string
    selfpropelled_machines: string
    working_with_firearms: string
    confined_space: string
    food_handling: string
    electrical_installations_and_services: string
    observation: string
    conclusion: string

    doctor_responsible: string
    local: string
    date: Date

    // examining doctor
    examining_doctor_fullname: string
    examining_doctor_function: string
    examining_doctor_crm: string

    // technical manager
    technical_manager_fullname: string
    technical_manager_function: string
    technical_manager_crm: string
    
}

interface CreateAsoServiceResponse {
    aso: Aso
}

export class CreateAsoService {
    constructor(
        private asosRepository: AsosRepository,
    ) { }

    async execute({
        companyId, employeeId, physical_occupational_risk, chemical_occupational_risk, biological_occupational_risk, occupational_risk_of_accidents, ergonomic_occupational_risk, work_at_height, selfpropelled_machines,
        working_with_firearms, confined_space, food_handling, electrical_installations_and_services, observation, conclusion, doctor_responsible, local, date, examining_doctor_fullname, examining_doctor_function, examining_doctor_crm,
        technical_manager_fullname, technical_manager_function, technical_manager_crm
    }: CreateAsoServiceRequest): Promise<CreateAsoServiceResponse> {
        const aso = await this.asosRepository.create({
            company: { connect: { id: companyId } },
            employee: { connect: { id: employeeId } },
            physical_occupational_risk,
            chemical_occupational_risk,
            biological_occupational_risk,
            occupational_risk_of_accidents,
            ergonomic_occupational_risk,
            work_at_height,
            selfpropelled_machines,
            working_with_firearms,
            confined_space,
            food_handling,
            electrical_installations_and_services,
            observation, conclusion,
            doctor_responsible,
            local,
            date,
            examining_doctor_fullname,
            examining_doctor_function,
            examining_doctor_crm,
            technical_manager_fullname,
            technical_manager_function,
            technical_manager_crm
        })

        return {
            aso
        }
    }
}