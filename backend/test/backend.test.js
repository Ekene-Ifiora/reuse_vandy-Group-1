import { describe, it } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import server from '../src/backend.js';

describe('API tests', () => {

    afterEach(() => {
        server.close();
    });

    it('Hello World', async () => {
        const response = await supertest(server).get('/');
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal('Hello World')
    })
})