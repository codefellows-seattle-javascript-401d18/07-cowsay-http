'use strict';

const server = require('../server.js');
const superagent = require('superagent');


describe('Testing the server file', function () {
  afterAll((done) => {
    server.close(done);
  });

  //POST
  describe('POST method, /cowsay endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/echo')
        .send('hello from my server!')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('should respond with user input', done => {
      superagent.post('localhost:3000/echo')
        .send('hello from my server!')
        .set('Content-Type','text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.value).toEqual('hello from my server!');
          done();
        });
    });

    test('undefined endpoint', done => {
      superagent.post('localhost:3000/')
        .send('hello from my server!')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(404);
          done();
        });
    });
  });

  //GET
  describe('GET method, /time endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.get('localhost:3000')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('should respond with the current date', done => {
      superagent.get('localhost:3000')
        .set('Content-Type','text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body).toHaveProperty('');
          expect(res.body).toHaveProperty('');
          done();
        });
    });

    test('undefined endpoint', done => {
      superagent.get('localhost:3000/')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(404);
          done();
        });
    });
  });
});

// PUT

// DELETE
