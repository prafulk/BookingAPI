import request from 'supertest';
import app from '../server.mjs';

test('End-to-end booking flow', async () => {
    const createResponse = await request(app).post('/booking').send({ /* booking data */ });
    expect(createResponse.statusCode).toBe(201);

    const getResponse = await request(app).get('/scheduler?week=2022-07-10');
    expect(getResponse.body.bookings).toContainEqual(createResponse.body);

    const deleteResponse = await request(app).delete(`/booking/${createResponse.body.id}`);
    expect(deleteResponse.statusCode).toBe(200);
});
