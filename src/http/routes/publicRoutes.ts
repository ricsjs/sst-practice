import { FastifyInstance } from "fastify";
import { authenticateUser } from "../controllers/users-controllers/user-authenticate";
import { refresh } from "../controllers/users-controllers/refresh";
import { createAdmin } from "../controllers/admin-controllers/create-admin";

export async function publicRoutes(app: FastifyInstance) {
  // auth
  app.patch('/token/refresh', refresh)
  app.post("/login", authenticateUser);
}
