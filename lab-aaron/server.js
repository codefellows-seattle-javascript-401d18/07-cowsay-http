'use strict';
//require in dependencies
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

//create body parser modeling lab example
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
}

//create the server modeling the lab example
const server = module.exports = http.createServer((req, res) =>{
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query)
  bodyParse(req, (err, body) => {
    if (err) {
      res.write('Error 500: Server Error');
      res.writeHead(500);
      res.end();
      return;
    };

    try {
      req.body = JSON.parse(body);
    } catch (err) {
      res.writeHead(400);
      res.end();
      return;
    }
    if (req.method === 'GET' && req.url.pathname === '/cowsay'){
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.write
      res.end();
      return;
    }
  }

  //for ALL requests made to /, the server should respond with the following:
  //a header containing Content-Type: text/plain
  //a status code of 200
  //a response with the string "hello from my server!"




  //*for all GET requests made to /cowsay, the server should respond with the following:
  // note: the query string should have the key value text=message
  // the response header should include Content-Type: text/plain
  // if the query text=messsage is set, respond with:
  // a status code of 200
  // a response body that includes the value returned from cowsay.say({ text: <querystring text> })
  // if the query text=message is not set, respond with:
  // status code 400
  // a body including the value returned from cowsay.say({ text: 'bad request' })



  // for all POST requests made to /cowsay, the server should respond with the following:
  // the response header should include Content-Type: text/plain
  // if the JSON {text: messsage} is set in the body, respond with:
  // a status code of 200
  // a response body including the value returned from cowsay.say({ text: <querystring text> })
  // if the JSON {text: messsage} is not set in the body, respond with:
  // status code 400
  // a body including the value returned from cowsay.say({ text: 'bad request' })






  server.listen(3000, () => {
    console.log('Listening on port: 3000')
  });
