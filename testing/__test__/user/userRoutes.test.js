import app from '../../../src/app.js';
import request from 'supertest';
import User from '../../dbConnector.js';
import hash from '../../../src/utils/hash.js';

const email = 'test2@mail.com';
const password = 'Jki90977_bidWE';

let user;
beforeAll(async () => {
    await app.ready();
    user = await User.create({
        first_name: 'Jorge',
        last_name: 'Ozuna',
        age: 20,
        email,
        password: hash.hashPassword(password)
    });
});

afterAll(async () => {
    await app.close();
    await User.destroy({ where: { email } });
});

describe('UNIT CASES TO END-POINT PUT /change-email', function () {

    test('PUT - change email', async function () {
        const response = await request(app.server)
            .put('/change-email')
            .send({ email, id: user.id });

        const { message } = response.body;
        const sr = await User.findOne({ where: { id: user.id } });

        expect(sr.email).toMatch(email);
        expect(message).toMatch('Email updated successfully');
    });
});

describe('UNIT CASES TO END-POINT PUT /change-name', function () {

    test('PUT - change name', async function () {
        const response = await request(app.server)
            .put('/change-name')
            .send({
                id: user.id, first_name: 'Alejandro', last_name: 'Salazar'
            });

        user = await User.findOne({ where: { id: user.id } });
        const { first_name, last_name } = user;
        const { message } = response.body;

        expect(message).toMatch('Name updated successfully');
        expect(first_name).toMatch('Alejandro');
        expect(last_name).toMatch('Salazar');
    });
});

describe('UNIT CASES TO END-POINT GET /user/:userid', function () {

    test('GET - user/:userid', async function () {
        const response = await request(app.server)
            .get(`/user/${user.id}`);

        const { first_name, last_name, age } = response.body.user;

        expect(first_name).toMatch(user.first_name);
        expect(last_name).toMatch(user.last_name);
        expect(age).toEqual(user.age);
    });
});

describe('UNIT CASES TO END-POINT GET ALL /users', function () {

    test('GET - all users', async function () {
        const response = await request(app.server)
            .get('/users');

        const { message, users } = response.body;

        expect(message).toMatch('Get users succesfully');
        users.forEach(user => {
            expect(user).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    age: expect.any(Number),
                })
            );
        });
    });
});

describe('UNIT CASES TO END-POINT PUT /change-password', function () {

    test('PUT - change password', async function () {
        const response = await request(app.server)
            .put('/change-password')
            .send({ id: user.id, password, newPassword: 'hkadujkwa', confirmNewPassword: 'hkadujkwa' });

        const { message } = response.body;
        expect(message).toMatch('Password updated successfully');
    });
});