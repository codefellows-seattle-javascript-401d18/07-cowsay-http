## Installation
```
download from Github
npm i

FYI about what this API contains:
//Dependencies
npm install superagent;
npm install uuid;
npm install nodemon;
npm install cowsay;

//Dev dependencies:
npm install eslint
npm install jest
```
## Stuff to Know
When you make a request (GET, PUT, POST, DELETE), you need to specify the query string (text following ?=text in our URL).

Example:
```
GET http://localhost/cowsay?=text:hello
```
There's probably a better way to do this, but hey, it's what we came up with!
