import server from '../../../src/app.js';
import request from 'supertest';
import User from '../../dbConnector.js';
import hash from '../../hash.js';

const email = 'test@mail.com';
const password = 'UnPato32LLamado_Juan';

beforeAll(async () => {
    await server.ready()
    await User.create({
        first_name: 'Jorge',
        last_name: 'Ozuna',
        age: 20,
        email,
        password: hash.hashPassword(password)
    });
});

afterAll(async () => {
    await server.close();
    await User.destroy({ where: { email } });
});

describe('POST/ auth', function () {
    test('Login', async() => {
        const response = await request(server.server)
            .post('/login')
            .send({ email, password })

        expect(response.statusCode).toBe(200);
    });
});