import { FastifyInstance } from "fastify";
import { authenticateUser } from "../controllers/users-controllers/user-authenticate-controller";
import { profile } from "../controllers/users-controllers/get-user-profile";
import { refresh } from "../controllers/users-controllers/refresh";
import { verifyJWT } from "../middlewares/jwt-verify";

export async function publicRoutes(app: FastifyInstance) {
  // auth
  app.patch('/token/refresh', refresh)

  app.post("/login", authenticateUser);
  app.get("/profile", { onRequest: [verifyJWT] }, profile);
}
