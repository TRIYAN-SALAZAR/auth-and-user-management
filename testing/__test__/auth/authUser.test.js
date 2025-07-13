import app from '../../../src/app.js';
import request from 'supertest';
import User from '../../dbConnector.js';
import hash from '../../hash.js';

const emails = ['test@mail.com', 'test_email@example.com'];
const password = 'UnPato32LLamado_Juan';
const jwtRegex = /([A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+)/g;


beforeAll(async () => {
    await app.ready()
    await User.create({
        first_name: 'Jorge',
        last_name: 'Ozuna',
        age: 20,
        email: emails[0],
        password: hash.hashPassword(password)
    });
});

afterAll(async () => {
    await app.close();
    await Promise.all(emails.map(email => User.destroy({ where: { email: email } })));
});

describe('POST/ auth', function () {
    test('Login', async () => {
        const response = await request(app.server)
            .post('/login')
            .send({ email: emails[0], password })

        expect(response.statusCode).toBe(200);
        expect(response._body.message).toMatch('Successful Login');
        expect(response._body.token).toMatch(jwtRegex);
    });

    test('SignIn', async () => {
        const dataUser = {
            firstName: "Joel",
            lastName: "Gamez",
            age: 19,
            email: emails[1],
            password: "Hju902_3inc"
        }

        const response = await request(app.server)
            .post('/signin')
            .send(dataUser)

        expect(response._body.message).toMatch("User Registered");
        expect(response._body.token).toMatch(jwtRegex);
    });
});