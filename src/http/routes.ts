import { FastifyInstance } from "fastify";
import { registerAdmin } from "./controllers/admin-controllers/register-admin";
import { authenticateAdmin } from "./controllers/admin-controllers/admin-authenticate";
import { registerCompany } from "./controllers/company-controllers/register-company";
import { authenticateCompany } from "./controllers/company-controllers/company-authenticate";

export async function appRoutes(app: FastifyInstance) {
    app.post('/admins', registerAdmin)
    app.post('/companies', registerCompany)

    app.post('/admin_login', authenticateAdmin)
    app.post('/company_login', authenticateCompany)    
}