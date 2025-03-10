'use strict';

import fastifyPlugin from 'fastify-plugin';
import { Sequelize } from 'sequelize';
import User from '../schemas/userShema.js';

async function dbConnector(fastify, options) {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_ADSRESS || 'localhost',
        username: process.env.DB_USER || 'postgres',
        password: process.env.PASSWORD || 'password',
        database: process.env.DATABASE || 'users',
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