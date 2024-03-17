import { FastifyInstance } from "fastify";
import { createAdmin } from "./controllers/admin-controllers/create-admin";
import { authenticateUser } from "./controllers/user-authenticate-controller";
import { createCompany } from "./controllers/company-controllers.ts/create-company";
import { createEmployee } from "./controllers/employee-controllers/create-employee";
import { createProfessional } from "./controllers/professional-controllers.ts/create-professional";
import { createUnit } from "./controllers/unit-controllers.ts/create-unit";
import { createExam } from "./controllers/exam-controllers.ts/create-exam";
import { createAso } from "./controllers/aso-controllers/create-aso";
import { listEmployees } from "./controllers/employee-controllers/list-employees";
import { deleteEmployees } from "./controllers/employee-controllers/delete-employee";

export async function appRoutes(app: FastifyInstance) {
    // employees requests
    app.post('/employees', createEmployee)
    app.get('/employees:companyId', listEmployees)
    app.put('/employees/:id', deleteEmployees)

    // companies requests
    app.post('/companies', createCompany)

    // units requests
    app.post('/units', createUnit)

    // professionals requests
    app.post('/professionals', createProfessional)

    // asos requests
    app.post('/asos', createAso)

    // exams requests
    app.post('/exams', createExam)

    // admin requests
    app.post('/admins', createAdmin)
    
    // auth
    app.post('/login', authenticateUser)
}