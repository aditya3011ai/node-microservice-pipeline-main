const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.status(200).send('Order Service Running!'));

describe('GET /', () => {
  it('should return status 200 and expected message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Order Service Running!');
  });
});
