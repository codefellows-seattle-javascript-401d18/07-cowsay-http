'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');//breaks down requests, the url, the objects within. knocks the url down into objects of its components. one of those is the query string.
//codefellows.com/myapp?name=scott&ta=allie...

const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const bodyParse = function(req, callback){
  if(req.method === 'POST' || req.method === 'PUT') {//first you have to validate that the... .Running string content through this request, used to update existing data on teh server.
    let body = ''; //readable string. starting value for putting this all together
    req.on('data', buffer => {//capture it in this
      body += buffer.toString();
    });
    req.on('end', () => callback(null, body));// end event. runs after the data transmission
    req.on('error', err => callback(err)); //error event, grab the error pass it to hte callback //short hand- req.on('error', callback)
  } else {
    callback(null, '{}');
  }
};

const server = module.exports = http.createServer((req, res)=> {
// see Class: http.Server in docs
//listen, open, respond, close
//Class: http.IncomingMessage ....is the request object
  console.log('pre parse', req.url);
  req.url = url.parse(req.url); //looks like the cf example above. the js object. breaks it down into protocal, path, domain
  // console.log(req.url);
  // console.log(req.url.query);
  req.url.query = queryString.parse(req.url.query);
  // console.log(req.url.query)

  bodyParse(req, (err, body)=> {
    if(err){
      res.writeHead(500);
      res.end(); //closes the loop
      return;  //breaks us out of this function
    }

    try {
      req.body = JSON.parse(body);//parse out hte body of hte request
    } catch(e) {
      res.writeHead(400);//write out a header, return the function
      res.end();
      return;
    }

    if(req.method ==='GET' && req.url.pathname === '/cowsay'){ //access a property to get a value. creating an end point for a get request.
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write(cowsay.say(req.url.query));//in terminal-- http GET :3000/time
      res.end();
      return;
    }
    res.writeHead(400);
    res.end();
  });
});
//
//     if(req.method === 'POST' && req.url.pathname === '/cowsay'){
//       res.writeHead(200, {//take hte data that's been stored in req.body (a js object)
//         'Content-Type': 'text/plain',
//       });
//       res.write(JSON.stringify(req.body));
//       res.end();
//       return;
//     }
//     res.writeHead(404);//we need to capture any other occurance of pass through. what if we don't hit one of these end points.
//     res.end();
//   });
// });

// in terminal-- npm run start:watch

//other window- http GET:3000

//terminal- npm super agent

// cowsay.think();

server.listen(PORT, ()=> console.log(`listening on: ${PORT}`));
