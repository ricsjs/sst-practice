import { FastifyInstance } from "fastify";
import { createAdmin } from "./controllers/admin-controllers/create-admin";
import { authenticateAdmin } from "./controllers/admin-controllers/admin-authenticate";

export async function appRoutes(app: FastifyInstance) {
    app.post('/admins', createAdmin)

    app.post('/admin_login', authenticateAdmin)
}