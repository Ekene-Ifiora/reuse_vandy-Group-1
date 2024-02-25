import { describe, it } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/backend.js';

describe('API tests', () => {
    it('Hello World', async () => {
        const response = await supertest(app).get('/');
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal('Hello World')
    })
})