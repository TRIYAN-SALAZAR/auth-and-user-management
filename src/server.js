'use strict';

import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import dbConnector from "./plugins/dbConnector.js";
import authRoutes from "./pages/routes/authRoutes.js";
import userRoute from "./pages/routes/userRoutes.js";

const envPath = './.env';
const server = fastify({ logger: true });
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

const UserSchema = server.schemas.User(server.sequelize);

async function start() {
    server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening on ${address}`);
    });
}

start();

export { UserSchema };