'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;


const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);


  // const server = module.exports = http.createServer((req, res) => {
  //   req.url = url.parse(req.url)
  //   req.url.query = querystring.parse(req.url.query)
  //   bodyParse(req, (err, body) => {
  //     if (err) {
  //       // resond to the user with a 500 server error
  //       res.writeHead(500)
  //       res.end()
  //       return
  //     }
  //
  //     // parse the body as json
  //     try {
  //       req.body = JSON.parse(body)
  //     } catch (err) {
  //       // if there was mal formated JSON we send back a 400 bad request
  //       res.writeHead(400)
  //       res.end()
  //       return
  //     }
  //
  //     // respond with a 200 status code and yay
  //
  //     // if the pathname is /time and a GET req send back the date
  //     if (req.method === 'GET' && req.url.pathname === '/time') {
  //       res.writeHead(200, {
  //         'Content-Type': 'application/json',
  //       })
  //       res.write(JSON.stringify({
  //         now: Date.now(),
  //         date: new Date(),
  //       }))
  //       res.end()
  //       return
  //     }
  //
  //     // if the pathname is /echo and a POST req send back their body as json
  //     if (req.method === 'POST' && req.url.pathname === '/echo') {
  //       res.writeHead(200, {
  //         'Content-Type': 'application/json',
  //       })
  //       res.write(JSON.stringify(req.body))
  //       res.end()
  //       return
  //     }
  //
  //     // otherwise 404
  //     res.writeHead(404)
  //     res.end()
  //   })
  //
  // })
  //
  // server.listen(3000, () => {
  //   console.log('server up :: 3000')
  // })

  if (req.method === 'POST' && req.url.pathname ==='/cowsay') {
    parseBody(req, function(err) {
      if (req.body.text) {
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.write(cowsay.say({ text: req.body.text }));
        res.end();
      } else {
        console.error('error:', err);
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({ text: 'bad POST request'}));
        res.end();
      }
    });
  }

  if(req.url.pathname === '/'){
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write('hello from my server');
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay'){
    let params = req.url.query;
    if (params.text){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: params.text, T: 'U', the_cow: 'bong'}));
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request'}));
    }
  }

  res.end();
});

server.listen(PORT, function(){
  console.log('server up on PORT:', PORT);
});
