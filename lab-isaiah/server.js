'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const querystring = require('querystring');
const PORT = process.env.PORT || 3000;

// callback should be (err, body) => undefined
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

    // respond with a 200 status code and yay

    // if the pathname is /time and a GET req send back the date
    if (req.method === 'GET' && req.url.pathname === '/time') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
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
        'Content-Type': 'application/json',
      });
      res.write(cowsay.say({text: 'Welcome! Hope you\'re in a grazing moooooooood'}));
      res.end();
      return;
    }

    if (req.method === 'GET' && req.url.pathname === '/cowsay') {
      if (!req.url.query.text) {
        res.writeHead(400, {
          'Content-Type': 'application/json',
        });
        res.write(cowsay.say({text: 'bad request'}));
        res.end();
        return;
      } else {
        console.log(req.url.query);
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.write(cowsay.say(req.url.query));
        res.end();
        return;
      }
    }

    // if the pathname is /echo and a POST req send back their body as json
    if (req.method === 'POST' && req.url.pathname === '/echo') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(req.body));
      res.end();
      return;
    }

    // otherwise 404
    res.writeHead(404);
    res.end();
  });

});

server.listen(PORT, () => {
  console.log('server up ::', PORT);
});
