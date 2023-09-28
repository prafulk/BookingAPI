import request from 'supertest';
import app from '../server.mjs';

test('GET /scheduler returns correct data', async () => {
    const response = await request(app).get('/scheduler?week=2022-07-10');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('userData');
});
