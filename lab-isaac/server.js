'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');

//callback should be (err, body) => undefined

const bodyParse = (req, callback) => {
  if(req.method === 'POST' || req.method === 'PUT') {
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
  req.url.query = queryString.parse(req.url.query);
  bodyParse(req, (err, body) => {

    if(err) {
      //respond to the user with a 500 server error
      res.writeHead(500);
      res.end();
      return;
    }
    /* for ALL requests made to /, the server should respond with the following:
    a header containing Content-Type: text/plain
    a status code of 200
    a response with the string "hello from my server!"*/
    if(req.url.pathname === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write(JSON.stringify('hello from my server!'));
      res.end();
      return;
    }
    /*  for all GET requests made to /cowsay, the server should respond with the following:
    note: the query string should have the key value text=message
    the response header should include Content-Type: text/plain
    if the query text=messsage is set, respond with:
    a status code of 200
    a response body that includes the value returned from cowsay.say({ text: <querystring text> })
    if the query text=message is not set, respond with:
    status code 400
    a body including the value returned from cowsay.say({ text: 'bad request' }) */

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

    /* for all **POST** requests made to `/cowsay`, the server should respond with the following:
      * the response header should include `Content-Type: text/plain`
      * if the JSON `{text: messsage}` is set in the body, respond with:
        * a status code of 200
        * a response body including the value returned from `cowsay.say({ text: <querystring text> })`
      * if the JSON `{text: messsage}` is **not** set in the body, respond with:
          * status code **400**
          * a body including the value returned from `cowsay.say({ text: 'bad request' })`*/

    if(req.method === 'POST' && req.url.pathname === '/cowsay') {
      console.log(req.url.query);
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


    //parse the body as json
    try {
      req.body = JSON.parse(body);
    } catch(err) {
      //if there was malformatted JSON, we send back a 400 bad request
      res.writeHead(400);
      res.end();
      return;
    }
  });
});

server.listen(3000, () => {
  console.log('server up :: 3000');
});
