const request = require('supertest');
const app = require('../server');

describe('Patients API', () => {
  it('should create a patient', async () => {
    const res = await request(app)
      .post('/api/patients')
      .send({ first_name: 'John', last_name: 'Doe', email: 'john@example.com' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.first_name).toBe('John');
  });
});
