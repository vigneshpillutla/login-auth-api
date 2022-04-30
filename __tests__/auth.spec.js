const request = require('supertest');
const session = require('express-session');
const sessionConfig = require('../config/sessions');
const { mongoose } = require('../config/database');
const { app, build, cleanUp } = require('../app');
// jest.useFakeTimers();

beforeAll(async () => {
  await build();
});

afterAll((done) => {
  cleanUp(done);
});

describe('Check if the api is running and configured', () => {
  test('Database should be connected', async () => {
    return expect(mongoose.connection.readyState).toBe(1);
  });

  test('API should be running', async () => {
    const response = await request(app).get('/');
    return expect(response.statusCode).toBe(200);
  });
});
