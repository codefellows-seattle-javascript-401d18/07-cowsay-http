//Ok I don't think this is really customized but it is in a separate module. Does that count?
'use strict';

//have all the things, bodyParser
const http = require('http');
const url = require('url');
// const querystring = require('querystring');
// const cowsay = require('cowsay');

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
