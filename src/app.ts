import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { publicRoutes } from "./http/routes/publicRoutes";
import { protectedRoutes } from "./http/routes/protectedRoutes";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.addHook("preHandler", (req, res, done) => {
  // Adiciona cabeçalhos CORS apenas se a origem da requisição for permitida
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Methods", "PUT");
  res.header("Access-Control-Allow-Headers", "*");

  // Verifica se a requisição é uma pré-verificação (preflight)
  const isPreflight = req.method === "OPTIONS";
  if (isPreflight) {
    // Retorna uma resposta vazia para pré-verificação (preflight)
    return res.send();
  }

  done();
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "7d",
  },
});

app.register(fastifyCookie);

app.register(publicRoutes);
app.register(protectedRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV != "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error." });
});
