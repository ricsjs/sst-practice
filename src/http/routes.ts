import { FastifyInstance } from "fastify";
import { createAdmin } from "./controllers/admin-controllers/create-admin";
import { authenticateAdmin } from "./controllers/admin-controllers/admin-authenticate";
import { createCompany } from "./controllers/company-controllers/create-company";
import { authenticateCompany } from "./controllers/company-controllers/company-authenticate";
import { createEmployee } from "./controllers/employee-controllers/create-employee";

export async function appRoutes(app: FastifyInstance) {
    app.post('/admins', createAdmin)
    app.post('/companies', createCompany)
    app.post('/employees', createEmployee)

    app.post('/admin_login', authenticateAdmin)
    app.post('/company_login', authenticateCompany)
}