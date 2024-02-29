import { FastifyInstance } from "fastify";
import { registerAdmin } from "./controllers/register-admin";
import { authenticateAdmin } from "./controllers/admin-authenticate";

export async function appRoutes(app: FastifyInstance) {
    app.post('/admins', registerAdmin)

    app.post('/sessions', authenticateAdmin)
}