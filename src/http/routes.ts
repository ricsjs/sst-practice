import { FastifyInstance } from "fastify";
import { createAdmin } from "./controllers/admin-controllers/create-admin";
import { authenticateUser } from "./controllers/user-authenticate-controller";
import { createCompany } from "./controllers/company-controllers.ts/create-company";
import { createEmployee } from "./controllers/employee-controllers/create-employee";
import { createProfessional } from "./controllers/professional-controllers.ts/create-professional";
import { createUnit } from "./controllers/unit-controllers.ts/create-unit";
import { createExam } from "./controllers/exam-controllers.ts/create-exam";
import { createAso } from "./controllers/aso-controllers/create-aso";
import { fetchAllEmployees } from "./controllers/employee-controllers/fetch-all-employees";
import { deleteEmployees } from "./controllers/employee-controllers/delete-employee";
import { updateEmployees } from "./controllers/employee-controllers/update-employee";
import { fetchAllUnits } from "./controllers/unit-controllers.ts/fetch-all-units";

export async function appRoutes(app: FastifyInstance) {
    // employees requests
    app.post('/employees', createEmployee)
    app.get('/employees:companyId', fetchAllEmployees)
    app.put('/employees/:id', deleteEmployees)
    app.put('/employees/update/:id', updateEmployees)

    // companies requests
    app.post('/companies', createCompany)

    // units requests
    app.post('/units', createUnit)
    app.get('/units', fetchAllUnits)

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