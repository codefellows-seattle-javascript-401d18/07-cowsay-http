'use strict';

const http = require('http');
const url = require('url').parse;
const querystring = require('querystring').parse;
const cowsay = require('cowsay');
const bodyParser = require('../module/bodyParse.js');
// const PORT = 3000 || process.env.PORT;


const server = module.exports = http.createServer((req, res) => {
  req.url = url(req.url);
  req.url.query = querystring(req.url.query);

  bodyParser(req, (err, body) => {
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
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request: no body provided');
      res.end();
      return;
    }
    // respond with a 200 status code and yay

    // if the pathname is / for ALL send back "hello from the server"
    //we don't specify get, put, etc and then it should apply to all
    if (req.url.pathname === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write('hello from my server');
      res.end();
      return;
    }

    if (req.method === 'GET' && req.url.pathname === '/cowsay') {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      let cow = cowsay.say(
        {
          text: req.url.query.text,
          f: req.url.query.f,
        }
      );
      res.write(cow);
      res.end();
      return;
    }

    if (req.method === 'POST' && req.url.pathname === '/cowsay') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      let cow = cowsay.say({text: req.body.text});
      res.write(cow);
      res.end();
      return;
    }
    //the otherwise 400 - instead of writing in 400 for every one like I did, we do kind of a giant if/else //

    res.writeHead(400, {'Content-Type': 'text/plain'});
    let cow = cowsay.say({text: 'bad route, mooooo!'});
    res.write(cow);
    res.end();
  });
});

server.listen(3000, () => {
  console.log('server up :: 3000');
});
