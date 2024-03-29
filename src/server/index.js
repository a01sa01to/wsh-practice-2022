import "regenerator-runtime/runtime";
import fastifyCompress from "@fastify/compress";
import fastifySensible from "@fastify/sensible";
import fastify from "fastify";

import { User } from "../model/index.js";

import { apiRoute } from "./routes/api.js";
import { createConnection } from "./typeorm/connection.js";
import { initialize } from "./typeorm/initialize.js";

const server = fastify();
server.register(fastifySensible);
server.register(fastifyCompress);

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
  res.header("Cache-Control", "no-cache, no-store, no-transform");
  res.header("Connection", "close");
});

server.register(apiRoute, { prefix: "/api" });

const start = async () => {
  try {
    await initialize();
    server.listen({ host: "0.0.0.0", port: process.env.PORT || 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
