## DOCUMENTATION

# Goals of this lab project:
* Identify key qualities of the HTTP protocol.
* Implement an HTTP server using the node.js `http` module.

# Brief description of this project:
* How to install / get started with this project:

* How to interact with the endpoints:
  - To GET cow pic in terminal (aka- a good request confirmation) type-- curl http://localhost:3000/cowsay?text=hello (or whatever you want after the '=' sign).
  - To GET a bad request confirmation type-- http GET :3000/cowsay

  * Sample requests and example responses:
    - Then the following bad request info is displayed in terminal:
    ```HTTP/1.1 400 Bad Request
    Connection: keep-alive
    Content-Type: text/plain
    Date: Wed, 30 Aug 2017 01:02:43 GMT
    Transfer-Encoding: chunked
    ```

# Packages and commands to remember:
  - npm install
  - npm install httpie
  - npm install superagent
  - npm install -g cowsay
  - npm install -D jest
    - npm test
  - node server.js
    - nc localhost 3000 (if needed?)
    - rs (restart, if needed)
