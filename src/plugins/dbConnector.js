'use strict';

import fastifyPlugin from 'fastify-plugin';
import { Sequelize } from 'sequelize';
import User from '../schemas/userShema.js';

async function dbConnector(fastify, options) {

    const sequelize = new Sequelize( fastify.config.POSTGRES_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: true,
            rejectUnauthorized: false
        }
    });
    try {
        fastify.decorate('sequelize', sequelize);
        fastify.decorate('schemas', {
            User: User(sequelize),
        });
        fastify.log.info('\nConnection has been established successfully.');
    } catch (error) {
        fastify.log.error('Unable to connect to the database');
        console.error('\n', error);
    }
}

export default fastifyPlugin(dbConnector);