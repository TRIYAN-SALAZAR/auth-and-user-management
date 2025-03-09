'use strict';

import fastifyPlugin from 'fastify-plugin';
import { Sequelize } from 'sequelize';
import User from '../schemas/userSchema.js';

async function dbConnector(fastify, options) {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        username: 'postgres',
        password: 'password',
        database: 'users',
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