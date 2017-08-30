'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');

const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const bodyParse = function(req, callback){
  if(req.method === 'POST' || req.method === 'PUT') {
    let body = '';
    req.on('data', buffer => {
      body += buffer.toString();
    });
    req.on('end', () => callback(null, body));
    req.on('error', err => callback(err));
  } else {
    callback(null, '{}');
  }
};

const server = module.exports = http.createServer((req, res)=> {

  console.log('pre parse', req.url);
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);


  bodyParse(req, (err, body)=> {
    if(err){
      res.writeHead(500);
      res.end();
      return;
    }

    try {
      req.body = JSON.parse(body);
    } catch(e) {
      res.writeHead(400);
      res.end();
      return;
    }

    if(req.method === 'GET' && req.url.pathname === '/cowsay') {
      if(!req.url.query.text) {
        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say({ text: 'bad request'}));
        res.end();
        return;
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say(req.url.query));
        res.end();
        return;
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`server up :: ${PORT}`);
});
