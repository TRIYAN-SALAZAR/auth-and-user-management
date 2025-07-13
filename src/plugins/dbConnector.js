'use strict';

import fastifyPlugin from 'fastify-plugin';
import { Sequelize, DataTypes } from 'sequelize';
import UserSchema from '../schemas/userShema.js';

async function dbConnector(server, options) {

    const sequelize = new Sequelize(server.config.POSTGRES_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        }
    });

    try {
        const User = UserSchema(sequelize, DataTypes);
        server.decorate('schema', {
            User
        });

        server.log.info('\nConnection has been established successfully.');
    } catch (error) {
        server.log.error('Unable to connect to the database');
        console.error('\n', error);
    }
}

export default fastifyPlugin(dbConnector);