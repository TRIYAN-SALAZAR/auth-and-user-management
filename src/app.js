'use strict';

import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import dbConnector from "./plugins/dbConnector.js";
import authRoutes from "./pages/routes/authRoutes.js";
import userRoute from "./pages/routes/userRoutes.js";

const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
    production: true,
    test: false,
}

const enviroment = process.argv[2];

const envPath = './.env';
const server = fastify({ logger: envToLogger[enviroment] ?? true });
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
await server.register(userRoute);

await server.ready();

export default server;