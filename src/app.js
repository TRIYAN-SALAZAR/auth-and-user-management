'use strict';

import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import dbConnector from "./plugins/dbConnector.js";
import authRoutes from "./pages/routes/authRoutes.js";
import userRoute from "./pages/routes/userRoutes.js";

const envToLogger = {
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'hostname',
        },
    },
}

const envPath = './.env';

const schemaENV = {
    type: 'object',
    required: ['POSTGRES_URL'],
    properties: {
        POSTGRES_URL: { type: 'string' }
    }

};

const options = {
    confKey: 'config',
    schema: schemaENV,
    dotenv: {
        path: envPath
    }
};

const server = fastify({ logger: envToLogger });

server.register(fastifyEnv, options)
    .after((err) => {
        if (err) throw err;
    });

await server.register(dbConnector);
await server.register(authRoutes);
await server.register(userRoute);

export default server;