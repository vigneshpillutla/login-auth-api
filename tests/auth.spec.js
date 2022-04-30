const request = require('supertest');
const _ = require('lodash');
const { mongoose } = require('../config/database');
const { app, build, cleanUp } = require('../app');

beforeAll(() => {
  process.env.NODE_ENV = 'development';
  return build();
});

afterAll((done) => {
  const { cleanUserDB } = require('./db');
  cleanUserDB();
  done();
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

describe('User', () => {
  const testUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@gmail.com',
    password: 'TestUser$1234'
  };
  const successResponse = {
    success: true,
    msg: 'User successfully signed up!',
    user: {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com'
    }
  };
  it('should create a new user', async () => {
    const response = await request(app).post('/api/auth/signUp').send(testUser);
    return expect(response.body).toEqual(successResponse);
  });
  it('should not allow a duplicate user', async () => {
    const response = await request(app).post('/api/auth/signUp').send(testUser);
    return expect(response.statusCode).toBe(401);
  });
});
