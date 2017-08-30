'use strict';

const server = require('../server.js');
const superagent = require('superagent');

describe('Testing the server file', function () {
  afterAll((done) => {
    server.close(done);
  });

  //TESTS FOR /ENDPOINT
  //SLASH ENDPOINT, POST
  describe('POST method, / endpoint', () => {
    test('should return a status code of 200 & message of hello from my server', done => {
      superagent.post('localhost:3000/')
        .send('hello from my server')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
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
      test('should return a status code of 400 & message of bad request', done => {
        superagent.post('localhost:3000/whatwhat')
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
  //SLASH ENDPOINT, PUT
  describe('PUT method, / endpoint', () => {
    test('should return a status code of 200 & message of hello from my server', done => {
      superagent.post('localhost:3000/')
        .send('hello from my server')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
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
      test('should return a status code of 400 & message of bad request', done => {
        superagent.post('localhost:3000/whatwhat')
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
  //SLASH ENDPOINT, GET
  describe('GET method, / endpoint', () => {
    test('should return a status code of 200 & message of hello from my server', done => {
      superagent.post('localhost:3000/')
        .send('hello from my server')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
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
      test('should return a status code of 400 & message of bad request', done => {
        superagent.post('localhost:3000/whatwhat')
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
  //SLASH ENDPOINT DELETE
  describe('DELETE method, / endpoint', () => {
    test('should return a status code of 200 & message of hello from my server', done => {
      superagent.post('localhost:3000/')
        .send('hello from my server')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
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
      test('should return a status code of 400 & message of bad request', done => {
        superagent.post('localhost:3000/whatwhat')
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
  //ENDPOINT COWSAY, POST
  describe('POST method, /cowsay', () => {
    test('should return a status code of 200 & message of howdy', done => {
      superagent.post('localhost:3000/cowsay?=texthowdy')
        .send('howdy')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
      test('should return a status code of 400 & message of bad request', done => {
        superagent.post('localhost:3000/cowsay')
          .send('bad request')
          .set('Content-Type', 'text/plain')
          .end((err, res) => {
            expect(err).not.toBeNull();
            expect(res.status).toBe(400);
            done();
          });
      test('should return a status code of 400 & message of bad request', done => {
        superagent.post('localhost:3000/cowsay/????texthello')
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
  //ENDPOINT COWSAY, GET
  describe('GET method, /cowsay', () => {
    test('should return a status code of 200 & message of howdy', done => {
      superagent.post('localhost:3000/cowsay?=texthowdy')
        .send('howdy')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
      test('should return a status code of 400 & message of bad request', done => {
        superagent.post('localhost:3000/cowsay')
          .send('bad request')
          .set('Content-Type', 'text/plain')
          .end((err, res) => {
            expect(err).not.toBeNull();
            expect(res.status).toBe(400);
            done();
          });
      test('should return a status code of 400 & message of bad request', done => {
        superagent.post('localhost:3000/cowsay/????texthello')
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
