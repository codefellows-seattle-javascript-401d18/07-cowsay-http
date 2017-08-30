'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const bodyParse = require('./lib/body-parser');
const PORT = process.env.PORT || 3000;

const server = module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  bodyParse(req, (err, body) => {
    if (err) {
      // resond to the user with a 500 server error
      res.writeHead(500);
      res.end();
      return;
    }

    // parse the body as json
    try {
      req.body = JSON.parse(body);
    } catch (err) {
      // if there was mal formated JSON we send back a 400 bad request
      res.writeHead(400);
      res.end();
      return;
    }

    if (req.method === 'GET' && req.url.pathname === '/cowsay') {
      let query = req.url.query;
      if (query.text) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: query.text, f: 'dragon'}));
        res.end();
        // return;
      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request', f: 'dragon'}));
        res.end();
        // return;
      }
    }

    if (req.method === 'POST' && req.url.pathname === '/cowsay') {
      console.log(req.body);
      if (req.body.text) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: req.body.text, f: 'dragon'}));
        res.end();
        // return;
      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request', f: 'dragon'}));
        res.end();
        // return;
      }
    }

    if (req.method === 'GET' && req.url.pathname === '/') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('hello from my server!');
      res.end();
      // return;
    }

    if (req.method === 'POST' && req.url.pathname === '/') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('hello from my server!');
      res.end();
      // return;
    }

    // otherwise 404
    res.writeHead(404);
    res.end();
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
