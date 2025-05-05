'use strict';

import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import dbConnector from "./plugins/dbConnector.js";
import authRoutes from "./pages/routes/userRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const envPath = './src/.env';
const server = fastify({ logger: true });
const schema = {
    type: 'object',
    required: ['DB_ADDRESS', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'],
    properties: {
        DB_ADDRESS: { type: 'string' },
        DB_PORT: { type: 'number' },
        DB_USER: { type: 'string', },
        DB_PASSWORD: { type: 'string', },
        DB_NAME: { type: 'string', },
        JWT_SECRET: { type: 'string', }
    }
};

const options = {
    confKey: 'config',
    schema,
    dotenv: {
        path: envPath
    }
};

server.register(fastifyEnv, options)
    .after((err) => {
        if (err) throw err;
        console.log('------------------------------------');
        console.log('fastify-env registered');
        console.log(server.config);
        console.log('------------------------------------');
    });

await server.register(dbConnector);
await server.register(authRoutes);
// await server.register(userRoutes);

await server.ready();

server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});

export default server;