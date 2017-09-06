'use strict';

const server = require('../server.js');
const superagent = require('superagent');
const cowsay = require('cowsay'); //duh//
require('jest'); //duh//

describe('Testing the server file', function() {
  afterAll(done => {
    server.close();
    done();
  });

  //SLASH ENDPOINT, POST
  describe('POST method, / endpoint', () => {
    test('should return a status code of 200 & message of hello from my server', done => {
      superagent.post(':3000/')
        .send({})
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(res.text).toBe('hello from my server');
          done();
        });
    });
    test('should return a status code of 400 & message of bad request', done => {
      superagent.post('localhost:3000/')
        .send('bad request')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(400);
          done();
        });
    });
  });
  // SLASH ENDPOINT, GET
  describe('GET method, / endpoint', () => {
    test('should return a status code of 200 & message of hello from my server', done => {
      superagent.post(':3000/')
        .send('req.url.query.text')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(res).not.toBe(null);
          done();
        });
    });

    test('should return a status code of 400 & message of bad request', done => {
      superagent.post(':3000/')
        .send('bad request')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(400);
          done();
        });
    });
  });
});
