import { FastifyInstance } from "fastify";
import { registerAdmin } from "./controllers/register-admin";
import { authenticateAdmin } from "./controllers/admin-authenticate";
import { registerCompany } from "./controllers/register-company";

export async function appRoutes(app: FastifyInstance) {
    app.post('/admins', registerAdmin)
    app.post('/companies', registerCompany)

    app.post('/sessions', authenticateAdmin)
}