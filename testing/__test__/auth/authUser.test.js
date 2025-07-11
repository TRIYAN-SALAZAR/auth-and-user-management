import fastify from 'fastify';
import app from '../../../src/app.js';
import request from 'supertest';
import User from '../../dbConnector.js';
import hash from '../../hash.js';
import { where } from 'sequelize';

const email = 'test@mail.com';
const password = 'UnPato32LLamado_Juan';
let server, userId;

beforeAll(async () => {
    server = app
    await server.ready()

    await User.create({
        first_name: 'Jorge',
        last_name: 'Ozuna',
        age: 20,
        email,
        password: hash.hashPassword(password)
    });

    // bug, resolve thus
    userId = await User.findOne({where: {email}});
});
console.log(userId)

afterAll(async () => {
    await User.destroy({ where: { email } });
    await server.close();
});

describe('POST/ auth', function () {
    test('Login', () => {
        const response = request(server.server)
            .post('/login')
            .send({ email, password, userId })
            .set('Content-Type', 'application/json')
            .then(data => data)
            .catch(err => err)

        expect(response.statusCode).toBe(200);
    });
});