'use strict';

import fastifyPlugin from 'fastify-plugin';
import { Sequelize } from 'sequelize';
import User from '../schemas/userShema.js';

async function dbConnector(fastify, options) {
    console.log('\n', fastify.config, '\n');
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: fastify.config.DB_ADDRESS,
        port: fastify.config.DB_PORT,
        username: fastify.config.DB_USER,
        password: fastify.config.DB_PASSWORD,
        database: fastify.config.DB_NAME,
    });
    try {
        await sequelize.authenticate();
        fastify.decorate('sequelize', sequelize);
        fastify.decorate('schemas', {
            User: User(sequelize),
        });
        fastify.log.info('\nConnection has been established successfully.');
    } catch (error) {
        fastify.log.error('Unable to connect to the database:');
        console.error(error);
    }
}

export default fastifyPlugin(dbConnector);