'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const bodyParse = require('./lib/body-parser');
const PORT = process.env.PORT || 3000;

// GET on /
// POST on /
// GET on /cowsay
// POST on /cowsay
// GET on /cowsay?text=message
// POST on /cowsay?text=message


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

    // if the pathname is /cowsay and a GET req send back the date
    if (req.method === 'GET' && req.url.pathname === '/cowsay') {
      if (req.url.query) {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay({ text: req.url.query}));
        res.end();
        return;
      } else if (!req.url.query) {
        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay({ text: 'bad request'}));
        res.end();
        return;
      }
    }

    // if the pathname is /cowsay and a POST req send back their body as json
    if (req.method === 'POST' && req.url.pathname === '/cowsay') {
      if (req.url.query) {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay({ text: req.url.query}));
        res.end();
        return;
      } else if (!req.url.query) {
        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay({ text: 'bad request'}));
        res.end();
        return;
      }
    }

    // if the pathname is / and a GET req send back
    if (req.method === 'GET' && req.url.pathname === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write('hello from my server!');
      res.end();
      return;
    }

    // if the pathname is / and a POST req send back
    if (req.method === 'POST' && req.url.pathname === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write('hello from my server!');
      res.end();
      return;
    }

    // otherwise 404
    res.writeHead(404);
    res.end();
  });

});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
