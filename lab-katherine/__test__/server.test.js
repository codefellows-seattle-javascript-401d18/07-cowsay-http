'use strict'

const server = require('../server.js')
const superagent = require('superagent')
const cowsay = require('cowsay');


describe('Testing the server file', function () {
  afterAll((done) => {
    server.close(done)
  })

  describe('undefined endpoints', () => {
    test('undefined POST endpoint', done => {
      superagent.post('localhost:3000/garbage')
        .send({'value': 'katherine'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull()
          expect(res.status).toBe(404)
          done()
        })
    })
    test('undefined GET endpoint', done => {
      superagent.get('localhost:3000/garbage')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull()
          expect(res.status).toBe(404)
          done()
        })
    })
  })

  describe('POST method, /echo endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/echo')
        .send({'value': 'why why why'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(200)
          done()
        })
    })
    test('should respond with user input', done => {
      superagent.post('localhost:3000/echo')
        .send({'value': 'katherine'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.body.value).toEqual('katherine')
          done()
        })
    })
  })

  describe('GET method, /time endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.get('localhost:3000/time')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(200)
          done()
        })
    })
    test('should respond with current date', done => {
      superagent.get('localhost:3000/time')
        .type('application/json')
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.body).toHaveProperty('now')
          expect(res.body).toHaveProperty('date')
          done()
        })
    })
  })

  describe('POST method, / endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/')
        .send({'text': 'cow cow'})
        .set('Content-Type', 'application/json')
        .end((err, res) =>{
          expect(err).toBeNull()
          expect(res.status).toBe(200)
          done()
        })
    })
    test('should respond with Please leave!', done => {
      superagent.post('localhost:3000/')
        .send({'text': 'Please leave!'})
        .type('application/json')
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.text).toBe('Please leave!')
          done()
        })
    })
  })

  describe('GET method, / endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.get('localhost:3000/')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(200)
          done()
        })
    })
    test('should respond with Please leave!', done => {
      superagent.get('localhost:3000/')
        .type('application/json')
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.text).toBe('Please leave!')
          done()
        })
    })
  })

  describe('POST method, /cowsay endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/cowsay')
        .send({'text': 'cow cow'})
        .set('Content-Type', 'application/json')
        .end((err, res) =>{
          expect(err).toBeNull()
          expect(res.status).toBe(200)
          done()
        })
    })
    test('should respond with "cow cow"', done => {
      superagent.post('localhost:3000/cowsay')
        .send({'text': 'cow cow'})
        .type('application/json')
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.text).toBe(cowsay.say({text: 'cow cow', f: 'beavis.zen'}))
          done()
        })
    })
  })

  describe('GET method, /cowsay endpoint', () => {
    test('should return a status code of 200', done => {
      superagent.get('localhost:3000/cowsay?text=garbage')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(200)
          done()
        })
    })
    test('should respond with garbage cowsay', done => {
      superagent.get('localhost:3000/cowsay?text=garbage')
        .type('application/json')
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.text).toBe(cowsay.say({text: 'garbage', f: 'beavis.zen'}))
          done()
        })
    })
  })

  describe('MALFORMED COWSAY', () => {
    test('bad POST should return 400', done => {
      superagent.post('localhost:3000/cowsay')
        .send({'what': 'nothing'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull()
          expect(res.status).toBe(400)
          done()
        })
    })
    test('empty POST should return 400', done => {
      superagent.post('localhost:3000/cowsay')
        .send({})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull()
          expect(res.status).toBe(400)
          done()
        })
    })
    test('bad GET should return 400', done => {
      superagent.get('localhost:3000/cowsay?what=nothing')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull()
          expect(res.status).toBe(400)
          done()
        })
    })
    test('empty GET should return 400', done => {
      superagent.get('localhost:3000/cowsay')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull()
          expect(res.status).toBe(400)
          done()
        })
    })
  })
})
