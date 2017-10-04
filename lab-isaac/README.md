# Lab 7: Vanilla HTTP Server - cowsay

## About

This app is a Nodejs HTTP server which utilizes the ```cowsay``` dependency to create custom responses.  It takes both POST and GET requests.

## Installation

Clone or fork this repo and download to your localhost.

```npm -i```

## Running application

To start the application:

```npm run start```

or

```npm start:watch```

Send the request to the following routes:

Both POST and GET ```/``` will return ```hello from my server```

GET to ```/cowsay``` will return the message included in the string query

POST to /cowsay will return the message included in the body in the format of ```{"text": "message"}``` ```application/JSON```

## Liscense

MIT
