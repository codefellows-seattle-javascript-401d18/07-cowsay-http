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
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/')
        .send('hello from my server!')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });
  });
  //SLASH ENDPOINT, PUT
  describe('PUT method, / endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/')
        .send('hello from my server!')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });
  });
  //SLASH ENDPOINT, GET
  describe('GET method, / endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });
  });
  //SLASH ENDPOINT, DELETE//
  describe('DEL method, / endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });
  });
  //SLASH COWSAY, POST
  describe('POST method, /cowsay', () => {
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/echo')
        .send({'value': 'scott-is-awesome'})
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });
  });
  //SLASH COWSAY, POST
  describe('POST method, /cowsay', () => {
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/echo')
        .send({'value': 'scott-is-awesome'})
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });
  });
});
