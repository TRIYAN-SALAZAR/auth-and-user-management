import server from '../../../src/app.js';
import request from 'supertest';
import User from '../../dbConnector.js';

beforeAll(() => {
    const user = User.build({
        first_name: 'Jorge',
        last_name: 'Ozuna',
        age: 20,
        email: 'test@mail.com',
        password: 'aaaaaa'
    });

    return user.save().then(data => data).catch(err => err);
});

describe('POST/ auth', function() {
    test("prueba 1", () => {
        expect(2).toEqual(2);
    });
});