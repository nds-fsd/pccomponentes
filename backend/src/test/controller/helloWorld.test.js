const superTest = require('supertest');
const { app, server } = require('../../index');
const fakeRequest = superTest(app);

describe('Hello World tests', () => {});
