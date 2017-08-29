'use strict';

const server = require('../server.js');
const superagent = require('superagent');
const cowsay = require('cowsay');


describe('Testing the server file', function () {
  afterAll((done) => {
    server.close(done);
  });

  describe('POST  method', () => {
    test('POST on /cowsay endpoint - should return status code 200', done => {
      superagent.post('localhost:3000/cowsay')
        .send({'value': 'scott-is-awesome'})
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('POST on /cowsay endpoint -  should return', done => {
      superagent.post('localhost:3000/cowsay')
        .send({'value': 'scott'})
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.value).toEqual('scott');
          done();
        });
    });

    test('POST on / endpoint - should return status code 200', done => {
      superagent.post('localhost:3000/')
        .send({'value': 'scott'})
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('POST on / endpoint - should return hello message', done => {
      superagent.post('localhost:3000/')
        .send({'value': 'scott'})
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.value).toEqual('hello from my server!');
          done();
        });
    });
  });

  describe('GET method', () => {
    test('GET on /cowsay endpoint - should return status code 200', done => {
      superagent.get('localhost:3000/cowsay')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('GET on /cowsay endpoint - should return', done => {
      superagent.get('localhost:3000/cowsay')
        .type('text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body).toHaveProperty('now');
          expect(res.body).toHaveProperty('date');
          done();
        });
    });

    test('GET on / endpoint - should return status code 200', done => {
      superagent.get('localhost:3000/time')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('GET on / endpoint - should return hello message', done => {
      superagent.get('localhost:3000/')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.value).toEqual('hello from my server!');
          done();
        });
    });
  });
});
