import { FastifyInstance } from "fastify";
import { registerAdmin } from "./controllers/register-admin";

export async function appRoutes(app: FastifyInstance) {
    app.post('/admins', registerAdmin)
}