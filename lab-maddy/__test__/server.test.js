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
      superagent.get('localhost:3000/time')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('should respond with the current date', done => {
      superagent.get('localhost:3000/time')
        .set('Content-Type','text/plain')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body).toHaveProperty('now');
          expect(res.body).toHaveProperty('date');
          done();
        });
    });

    test('undefined endpoint', done => {
      superagent.get('localhost:3000/')
        .set('Content-Type', 'hello from my server!')
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


//----- CLASS NOTES-------
// const servercosnt
// const superagent
// //don't forget to npm install superagent
//
// describe('POST method, /echo endpoint', ()=> {
//   test('should....')
//
// }
// )
//
// describe('POST method, /echo endpoint', ()=> {
//   test('should....')
//     superagent.post('localhost:3000/echo')
//       .send({'value': 'scott-is-awesome'})//need whenver you're making a put or a post request
//       .set('Content-Type', 'application/json')
//       .type('application/json')
//       .end((err, res) => {
//         expect(err).toBeNull()
//         expect(rest).toBe(200)
//         done()
//     }
//   test('should respond with user input', done => {
//     superagent.post('localhost:3000/echo')
//     .send({'value': 'scott'})
//   })
// }
// )
//
// //GET
//
// describe('GET method, /time endpoint', () => {
//   test('shoudl return a status code of 200', done =>
//     superagent.get('locahost:3000')
//   )
// }
// )
//
// test('shoudl respons with the current date', done =>
//   superagent.get('localhost:3000/time')
//     .type('application')
// )
