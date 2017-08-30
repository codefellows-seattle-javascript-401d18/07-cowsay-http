'use strict';

const server = require('../server.js');
const superagent = require('superagent');
const cowsay = require('cowsay');

describe('Testing the server file', function () {
  afterAll((done) => {
    server.close(done);
  });
  //POST FOR ECHO
  describe('POST method, /echo endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/echo')
        .send({'value': 'scott-is-awesome'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('should respond with user input', done => {
      superagent.post('localhost:3000/echo')
        .send({'value': 'scott'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.value).toEqual('scott');
          done();
        });
    });


    test('undefined endpoint', done => {
      superagent.post('localhost:3000/monkeys')
        .send({'value': 'scott'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          // expect(err).toBeNull();
          expect(res.status).toBe(404);
          done();
        });
    });
  });
  //GET FOR TIME
  describe('GET method, /time endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.get('localhost:3000/time')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('should respond with the current date', done => {
      superagent.get('localhost:3000/time')
        .type('application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body).toHaveProperty('now');
          expect(res.body).toHaveProperty('date');
          done();
        });
    });

    test('undefined endpoint', done => {
      superagent.get('localhost:3000/monkeys2')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(404);
          done();
        });
    });
  });
  //GET FOR /
  describe('GET method, / endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.get('localhost:3000/')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('should respond with Hello from my server!', done => {
      superagent.get('localhost:3000/')
        .type('text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.text).toEqual("\"Hello from my server!\"");
          done();
        });
    });

    test('undefined endpoint', done => {
      superagent.get('localhost:3000/monkey')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(404);
          done();
        });
    });
  });
  //POST FOR /
  describe('POST method, / endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(400);
          done();
        });
    });

    test('should return 400 when trying to send data after /', done => {
      superagent.post('localhost:3000/ text=hi')
        .type('text/plain')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toEqual(400);
          done();
        });
    });

    test('undefined endpoint', done => {
      superagent.post('localhost:3000/monkey')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(400);
          done();
        });
    });
  });
  //GET FOR /COWSAY
  describe('GET method, /cowsay endpoint', () => {
    test('should throw error, status 400, if user types /cowsay', done => {
      superagent.get('localhost:3000/cowsay')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(400);
          done();
        });
    });

    test('When passing nothing after /cowsay should return 400', done => {
      superagent.get('localhost:3000/cowsay')
        .type('text/plain')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toEqual(400);
          done();
        });
    });

    test('Should return cow with user input', done => {
      superagent.get('localhost:3000/cowsay')
        .send({'text': 'Hi, Im Cow'})
        .type('application/json')
        .end((err, res) => {
          // expect(res.status).toBe(200);
          expect(res.text).toEqual(cowsay.say({ text: 'bad request' }));
          done();
        });
    });
  });
  //POST FOR /COWSAY
  describe('POST method, /cowsay endpoint', () => {
    test('should return 400 when user doesnt send any data', done => {
      superagent.post('localhost:3000/cowsay')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(400);
          done();
        });
    });

    test('Should return cowsay with "Hi, Im Cow"', done => {
      superagent.post('localhost:3000/cowsay')
        .send({'text': 'Hi, Im Cow'})
        .type('application/json')
        .end((err, res) => {
          expect(res.text).toEqual(cowsay.say({ text: JSON.stringify('Hi, Im Cow') }));
          expect(res.status).toEqual(200);
          done();
        });
    });
  });
});
