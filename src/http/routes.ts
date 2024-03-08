import { FastifyInstance } from "fastify";
import { createAdmin } from "./controllers/admin-controllers/create-admin";
import { authenticateUser } from "./controllers/user-authenticate-controller";
import { createCompany } from "./controllers/company-controllers.ts/create-company";
import { createEmployee } from "./controllers/employee-controllers/create-employee";

export async function appRoutes(app: FastifyInstance) {
    app.post('/admins', createAdmin)
    app.post('/companies', createCompany)
    app.post('/employees', createEmployee)

    app.post('/login', authenticateUser)
}