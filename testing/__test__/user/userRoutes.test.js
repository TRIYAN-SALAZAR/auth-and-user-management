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

describe('EndPoints Users', () => {
    test('PUT - change password', async () => {
        const response = await request(app.server)
            .put('/change-password')
            .send({ id: user.id, password, newPassword: 'hkadujkwa', confirmNewPassword: 'hkadujkwa' });

        const {message} = response.body;
        expect(message).toMatch('Password updated successfully');
    });

    test('PUT - change email', async () => {
        const response = await request(app.server)
            .put('/change-email')
            .send({ email, id: user.id });

        const {message} = response.body;
        const sr = await User.findOne({ where: { id: user.id } });

        expect(sr.email).toMatch(email);
        expect(message).toMatch('Email updated successfully');
    });

    test('PUT - change name', async () => {
        const response = await request(app.server)
            .put('/change-name')
            .send({
                id: user.id, first_name: 'Alejandro', last_name: 'Salazar'
            });

        const { first_name, last_name } = await User.findOne({ where: { id: user.id } });
        const { message } = response.body;

        expect(message).toMatch('Name updated successfully');
        expect(first_name).toMatch('Alejandro');
        expect(last_name).toMatch('Salazar');
    });
});