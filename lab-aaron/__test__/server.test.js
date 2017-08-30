'use strict';

const server = require('../server.js');
const superagent = require('superagent');

describe('Testing the server.js file');
afterAll((done) => {
  server.close(done);
});




//test that validates any request to / and assert the 200 response, including the defined response



//write tests that validate all GET requests to /cowsay and assert that the 200 response is recieved, including the cowsay response>>>Dont forget the query string format required for the text message


//write tests that validate any malformed requests to /cowsay and assert that the 400 response is received, including cowsay response

//write tests that validate all POST requests to /cowsay and assert the 400 response is received, including cowsay>>>do not forget the request body format for the text message.
