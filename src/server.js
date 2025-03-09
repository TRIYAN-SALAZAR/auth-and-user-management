'use strict';

import fastify from "fastify";
import dbConnector from "./plugins/dbConnector.js";
import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

const server = fastify({logger: true});

server.register(dbConnector);
server.register(authRoutes);
// server.register(userRoutes);

server.get("/", async (request, reply) => {
    reply.send({message: "Hello World", version: "1.0.0", author: "TRIYAN-SALAZAR", description: "API REST con Fastify"})
});

server.listen({port: 3000}, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    
    console.log(`Server listening on ${address}`)
});

export default server;