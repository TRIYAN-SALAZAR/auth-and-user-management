'use strict';

import fastifyPlugin from 'fastify-plugin';
import { Sequelize } from 'sequelize';
import User from '../schemas/userShema.js';

async function dbConnector(fastify, options) {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_ADDRESS || 'localhost',
        port: process.env.DE_PORT || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.PASSWORD || 'password',
        database: process.env.DB_NAME || 'users',
    });

    try {
        await sequelize.authenticate();
        fastify.decorate('sequelize', sequelize);
        fastify.decorate('schemas', {
            User: User(sequelize),
        });
        console.log('Connection has been established successfully.');
    } catch (error) {
        fastify.log.error('Unable to connect to the database:', error);
    }
}

export default fastifyPlugin(dbConnector);