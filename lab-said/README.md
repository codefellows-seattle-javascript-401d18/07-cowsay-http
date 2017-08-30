#### Configuration  
<!-- list of files, configurations, tools, etc that are required -->
Your lab directory must include  
* `.gitignore`
* `.eslintrc.json`
* `.eslintignore`
* `package.json`
* `README.md`

#### Feature Tasks  
* documentation:
  - Brief description of you app
  - How to install / get started with your app
  - How to interact with the endpoints
    - Sample requests and example responses
    - _note: use a code block to show the HTTPie and response format_
* create an HTTP Server using the NodeJS `http` module
* create a *custom* body parsing module that is used for parsing the body of all **POST** and **PUT** requests
* for **ALL** requests made to `/`, the server should respond with the following:
  * a header containing `Content-Type: text/plain`
  * a status code of **200**
  * a response with the string "hello from my server!"
* for all **GET** requests made to `/cowsay`, the server should respond with the following:
  * _note: the query string should have the key value `text=message`_
  * the response header should include `Content-Type: text/plain`
  * if the query `text=messsage` is set, respond with:
    * a status code of **200**
    * a response body that includes the value returned from `cowsay.say({ text: <querystring text> })`
  * if the query `text=message` is **not** set, respond with:
    * status code **400**
    * a body including the value returned from `cowsay.say({ text: 'bad request' })`
* for all **POST** requests made to `/cowsay`, the server should respond with the following:
  * the response header should include `Content-Type: text/plain`
  * if the JSON `{text: messsage}` is set in the body, respond with:
    * a status code of 200
    * a response body including the value returned from `cowsay.say({ text: <querystring text> })`
  * if the JSON `{text: messsage}` is **not** set in the body, respond with:
      * status code **400**
      * a body including the value returned from `cowsay.say({ text: 'bad request' })`

#### Tests
* write tests that validate any request to `/` and assert that the **200** response is received, including the defined response message
* write tests that validate all **GET** requests to `/cowsay` and assert that the **200** response is received, including the cowsay response message
  - Do not neglect the query string format required for the text message
* write tests that validate any malformed reqeusts to `/cowsay` and assert that the **400** response is received, including the cowsay response message
* write tests that validate all **POST** requests to `/cowsay` and assert that the **200** response is received, including the cowsay response message
* write tests that validate any malformed reqeusts to `/cowsay` and assert that the **400** response is received, including the cowsay response message
  - Do not neglect the request body format required for the text message
