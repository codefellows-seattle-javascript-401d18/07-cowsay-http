'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const querystring = require('querystring');
const PORT = process.env.PORT || 3000;

const bodyParse = (req, callback) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    let body = '';
    req.on('data', (buf) => {
      body += buf.toString();
    });
    req.on('end', () => callback(null, body));
    req.on('error', (err) => callback(err));
  } else {
    callback(null, '{}');
  }
};

const server = module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  bodyParse(req, (err, body) => {
    if (err) {
      res.writeHead(500);
      res.end();
      return;
    }

    try {
      req.body = JSON.parse(body);
    } catch (err) {
      res.writeHead(400);
      res.end();
      return;
    }

    if (req.method === 'GET' && req.url.pathname === '/time') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write(JSON.stringify({
        now: Date.now(),
        date: new Date(),
      }));
      res.end();
      return;
    }

    if (req.method === 'GET' && req.url.pathname === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write(cowsay.say({text: 'hello from my server!'}));
      res.end();
      return;
    }

    if (req.method === 'GET' && req.url.pathname === '/cowsay') {
      if (!req.url.query.text) {
        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say(req.url.query));
        res.end();
        return;
      } else {
        console.log(req.url.query);
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say(req.url.query));
        res.end();
        return;
      }
    }

    if (req.method === 'POST' && req.url.pathname === '/cowsay') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write(JSON.stringify(req.body));
      res.end();
      return;
    }

    res.writeHead(404);
    res.end();
  });

});

server.listen(PORT, () => {
  console.log('server up ::', PORT);
});
