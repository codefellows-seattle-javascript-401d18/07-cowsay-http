'use strict';

const server = require('../server.js');
const superagent = require('superagent');

describe('Testing the server file', function () {
  afterAll((done) => {
    server.close(done);
  });

  describe('POST method, /cowsay endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/cowsay')
        .send({'value': 'Isaiah was here!'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('should respond with user input', done => {
      superagent.post('localhost:3000/cowsay')
        .send({'value': 'Isaiah was here!'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.value).toEqual('Isaiah was here!');
          done();
        });
    });


    test('undefined endpoint', done => {
      superagent.post('localhost:3000/')
        .send({'value': 'Isaiah was here!'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(404);
          done();
        });
    });
  });

  describe('GET method, /cowsay endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.get('localhost:3000/cowsay')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('should respond with the current date', done => {
      superagent.get('localhost:3000/cowsay')
        .type('application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body).toHaveProperty('now');
          expect(res.body).toHaveProperty('date');
          done();
        });
    });

    test('undefined endpoint', done => {
      superagent.get('localhost:3000/')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(404);
          done();
        });
    });
  });
});
