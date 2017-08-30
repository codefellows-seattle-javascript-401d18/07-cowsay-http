## DOCUMENTATION


* Identify key qualities of the HTTP protocol
* students will be able to implement an HTTP server using the node.js `http` module

Brief description of you app
- How to install / get started with your app
- How to interact with the endpoints
  - Sample requests and example responses
  - _note: use a code block to show the HTTPie and response format_


  - npm install- DONE
  - npm install httpie -DONE
  - npm install superagent
  - npm install uuid ???
  - npm install -g cowsay- DONE
  - npm install -D jest
    - npm test
  - node server.js
    - nc localhost 3000
  -

- TO GET COW pic in terminal type-- curl http://localhost:3000/cowsay?text=hello
- To GET bad request confirmation type-- http GET :3000/cowsay
  - Then the following bad request info is displayed in terminal:
    HTTP/1.1 400 Bad Request
    Connection: keep-alive
    Content-Type: text/plain
    Date: Wed, 30 Aug 2017 01:02:43 GMT
    Transfer-Encoding: chunked
