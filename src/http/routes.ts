import { FastifyInstance } from "fastify";
import { createAdmin } from "./controllers/admin-controllers/create-admin";
import { authenticateUser } from "./controllers/user-authenticate";

export async function appRoutes(app: FastifyInstance) {
    app.post('/admins', createAdmin)

    app.post('/login', authenticateUser)
}