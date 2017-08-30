'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const PORT = 3000 || process.env.PORT;

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

    // if the pathname is / for ALL send back "hello from the server"
    if (req.url.pathname === '/') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify('hello from my server'));
      res.end();
      return;
    }

    if (req.method === 'GET' && req.url.pathname === '/cowsay') {
      if (!req.url.query.text) {
        res.writeHead(400);
        res.writeHead(cowsay.say({text: req.url.query.text, e: 'oO', T: 'U ', f:'whale.cow' }));
        res.end();
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.write(cowsay.say(req.url.query));
        res.end();
        return;
      }
    }
  });

  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    if (!req.url.query.text) {
      res.writeHead(400);
      res.writeHead(cowsay.say({ text: 'bad request' , e: 'oO', T: 'U', f: 'dragon.cow'}));
      res.end();
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(cowsay.say(req.url.query));
      res.end();
      return;
    }
  }
});

//
// // if the pathname is /echo and a POST req send back their body as json
// if (req.method === 'POST' && req.url.pathname === '/echo') {
//   res.writeHead(200, {
//     'Content-Type': 'application/json',
//   });
//   res.write(JSON.stringify(req.body));
//   res.end();
//   return;
// }

// otherwise 404
//     res.writeHead(404);
//     res.end();
//   });
//
// });

server.listen(3000, () => {
  console.log('server up :: 3000');
});
