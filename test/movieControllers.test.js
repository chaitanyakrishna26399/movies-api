import request from 'supertest';
import app from '../app';

describe('API Tests', () => {
  it('should respond with JSON for GET /movies', async () => {
    const response = request(app).get('/api/endpoint1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('API Endpoint 1');
  });

  it('should respond with JSON for POST /movies', async () => {
    const response = await request(app).post('/movies').send({ data: 'Test Data' });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('API Endpoint 2 received data: Test Data');
  });

  it('should respond with JSON for PUT /movies/:id', async () => {
    const response = request(app).put('/movies/123');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('API Endpoint 3 for ID: 123');
  });

  it('should respond with JSON for DELETE /movies/:id', async () => {
    const response= request(app).delete('//456');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('API Endpoint 4 for ID: 456');
  });
});
