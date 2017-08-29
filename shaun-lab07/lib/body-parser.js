'use strict';

module.export = {};

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
