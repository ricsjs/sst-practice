import { FastifyInstance } from "fastify";
import { authenticateUser } from "../controllers/user-authenticate-controller";
import { profile } from "../controllers/get-user-profile";

export async function publicRoutes(app: FastifyInstance) {
  // auth
  app.post("/login", authenticateUser);
  app.get("/profile", profile);
}
