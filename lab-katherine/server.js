'use strict'

const http = require('http')
const url = require('url')
const querystring = require('querystring')
const cowsay = require('cowsay')

const bodyParse = (req, callback) => {
  if(req.method === 'POST' || req.method === 'PUT') {
    let body = ''
    req.on('data', (buf) => {
      body += buf.toString()
    })
    req.on('end', () => callback(null, body))
    req.on('error', (err) => callback(err))
  } else {
    callback(null, '{}')
  }
}

const server = module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url)
  req.url.query = querystring.parse(req.url.query)
  bodyParse(req, (err, body) =>{
    if (err){
      res.writeHead(500)
      res.end()
      return
    }
    try {
      req.body = JSON.parse(body)
    } catch (err) {
      res.writeHead(400)
      res.end()
      return
    }

    ///TIME
    if (req.method === 'GET' && req.url.pathname === '/time') {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.write(JSON.stringify({
        now: Date.now(),
        date: new Date()
      }))
      res.end()
      return
    }

    ///
    if (req.method === 'GET' && req.url.pathname === '/'){
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.write('Please leave!')
      res.end()
      return
    }

    if (req.method === 'POST' && req.url.pathname === '/') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Please leave!');
      res.end();
      return;
    }

    ///ECHO
    if (req.method === 'POST' && req.url.pathname === '/echo') {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.write(JSON.stringify(req.body))
      res.end()
      return
    }

    ///COWSAY
    if (req.method === 'GET' && req.url.pathname === '/cowsay') {
      let query = req.url.query.text
      if(query){
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write(cowsay.say({text: (req.url.query.text), f: 'beavis.zen'}))
        res.end()
        return
      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.write(cowsay.say({
          text: 'bad request',
          f: 'beavis.zen'
        }))
        res.end()
        return
      }
    }

    if (req.method === 'POST' && req.url.pathname === '/cowsay') {
      if (req.body.text) {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write(cowsay.say({text: req.body.text, f: 'beavis.zen'}))
        res.end()
        return
      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.write(cowsay.say({text: 'bad request', f: 'beavis.zen'}))
        res.end()
        return
      }
    }
    res.writeHead(404)
    res.end()
  })
})

server.listen(3000, () => {
  console.log('server up :: 3000')
})
