import "regenerator-runtime/runtime";
import fastifySensible from "@fastify/sensible";
import fastify from "fastify";

import { User } from "../model/index.js";

import { apiRoute } from "./routes/api.js";
import { spaRoute } from "./routes/spa.js";
import { createConnection } from "./typeorm/connection.js";
import { initialize } from "./typeorm/initialize.js";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const server = fastify({
  http2: true,
  logger: !IS_PRODUCTION
});
server.register(fastifySensible);

server.addHook("onRequest", async (req, res) => {
  const repo = (await createConnection()).getRepository(User);

  const userId = req.headers["x-app-userid"];
  if (userId !== undefined) {
    const user = await repo.findOne(userId);
    if (user === undefined) {
      res.unauthorized();
      return;
    }
    req.user = user;
  }
});

server.addHook("onRequest", async (req, res) => {
  if (req.url.includes("api")) res.header("Cache-Control", "no-cache, no-store, no-transform");
  else res.header("Cache-Control", "immutable")

  res.header("Connection", "close")
});

server.register(apiRoute, { prefix: "/api" });
server.register(spaRoute);

const start = async () => {
  try {
    await initialize();
    server.listen({
      host: "0.0.0.0",
      port: process.env.PORT || 3000
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
