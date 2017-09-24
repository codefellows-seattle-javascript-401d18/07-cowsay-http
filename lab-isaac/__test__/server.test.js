'use strict';

const server = require('../server.js');
const superagent = require('superagent');

describe('Testing the server file', function () {
  afterAll((done) => {
    server.close(done);
  });

  describe('Any method, / endpoint', () => {
    test('should return 200 status code', done => {
      superagent.post('localhost:3000/')
        .set('Content-Type', 'text/plain').
        end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });
    test('should return "hello from my server!"', done => {
      superagent.post('localhost:3000/')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(JSON.parse(res.text)).toEqual('hello from my server!');
          done();
        });
    });
    test('should return "hello from my server!" using GET', done => {
      superagent.get('localhost:3000/')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(JSON.parse(res.text)).toEqual('hello from my server!');
          done();
        });
    });
  });

  describe('GET method, /cowsay endpoint', () => {
    test('should return a 200 status code with text', done => {
      superagent.get('localhost:3000/cowsay?text=Hello World!')
        // .send({'text': 'Hello World!'})
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(res.status).toBe(200);
          done();
        });
    });
    test('should return a 400 status code with text', done => {
      superagent.get('localhost:3000/cowsay')
        // .send({'text': 'Hello World!'})
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(res.status).toBe(400);
          expect(res.text).toContain('bad request');
          done();
        });
    });
  });
  describe('POST method, /cowsay endpoint', () => {
    test('POST with properly formatted body should return 200', done => {
      superagent.post(':3000/cowsay')
        .set('Content-Type', 'application/json')
        .send('{"text": "hi there my friend"}')
        .end((err, res) => {
          expect(res.status).toBe(200);
          done();
        });
    });
    test('properly formatted post should return correct res text', done => {
      superagent.post(':3000/cowsay')
        .set('Content-Type', 'application/json')
        .send('{"text": "hi there my friend"}')
        .end((err, res) => {
          expect(res.text).toContain('hi there my friend');
          done();
        });
    });
    test('malformatted POST should return 400', done => {
      superagent.post(':3000/cowsay')
        .set('Content-Type', 'application/json')
        .send('hi there my friend')
        .end((err, res) => {
          expect(res.status).toBe(400);
          done();
        });
    });
    test('malformatted POST should return bad request', done => {
      superagent.post(':3000/cowsay')
        .set('Content-Type', 'application/json')
        .send('{"hi there friend"}')
        .end((err, res) => {
          expect(res.text).toContain('bad request');
          done();
        });
    });
  });
});
