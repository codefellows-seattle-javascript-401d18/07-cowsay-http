![Cowsay](https://media.giphy.com/media/A5pcWMMIEO95S/giphy.gif)

# Cowsay
You can make your server more majestic with the addition of a talking cow. This package creates an ASCII cow who delivers your HTTP request/response statuses. Your 404s will now be a delight when delivered from the ASCII representation of a bovine.

## Installation
```
download from Github
npm i
```
FYI about what this API contains:

**Dependencies**
+ npm install superagent;
+ npm install uuid;
+ npm install nodemon;
+ npm install cowsay;

**Dev dependencies:**
+ npm install eslint
+ npm install jest


## List of Endpoint Interactions
```
GET/POST/PUT/DELETE http://localhost:3000/
//Returns status code of 200 & the message "hello from my server"
```
Using HTTP methods GET & POST you can make your cow say something
```
GET http://localhost:3000/cowsay?=text:yourtext
POST http://localhost:3000/cowsay?=text:yourtext
//Either method will return a cow saying your message in the terminal in which your command line HTTP client is working. //

```

## Seeing a cow
Make sure your server is running
```
node server.js
```

Your cow will appear in your favorite command line HTTP client when you make a request that has a cow assigned to it. Suggestions: HTTPie for Macs, Postman/Curl for most systems
Example:
```
curl http://localhost:3000/ -v
```

## Changing Your Cow
It's possible to change your own with the addition of another argument wherever you've used cowsay.say() by setting f to another default cow (see cowsay docs for [list of cows](https://github.com/piuccio/cowsay)).
Example:
```
cowsay.say({text: req.url.query.text, e: 'oO', T: 'U ', f:'whale.cow'
```
