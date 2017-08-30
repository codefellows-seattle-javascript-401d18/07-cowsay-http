'use strict';

const server = require('../server.js');
const superagent = require('superagent');

describe('Testing the server file', function () {
  afterAll((done) => {
    server.close(done);
  });

  describe('POST method, / endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/')
      .send({})
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.status).toBe(200);
        done();
      });
    });
  });
});
