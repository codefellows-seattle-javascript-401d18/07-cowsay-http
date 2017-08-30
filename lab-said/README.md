#### Configuration  
Mylab directory must include  
* `.gitignore`  
* `.eslintrc.json`  
* `.eslintignore`  
* `package.json`  
* `README.md`  

#### Feature Tasks  
  - Brief description of my app: it allow users to access routs and its contents at a localhost server 3000  
  - How to install / get started with my app: run the server.js file in the back ground of your terminal and execute GET command to get information out of the server and POST command to post to the server  
  - How to interact with the endpoints: by typing either GET or POST followed by localhost:3000/ or localhost:3000/cowsay  
    - Sample requests and example responses  :  
    if(req.method === 'GET' && req.url.pathname === '/cowsay') {
      if(!req.url.query.text) {
        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say({ text: 'bad request'}));
        res.end();
        return;
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say(req.url.query));
        res.end();
        return;
      }
    }  

* created an HTTP Server using the NodeJS `http` module  
* created a *custom* body parsing module that is used for parsing the body of all **POST** and **PUT** requests  
* for **ALL** requests made to `/`, the server should respond with the following:  
  * a header containing `Content-Type: text/plain`  
  * a status code of **200**  
  * a response with the string "hello from my server!"  
* for all **GET** requests made to `/cowsay`, the server should respond with the following:   
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
* wrote tests that validate any request to `/` and assert that the **200** response is received, including the defined response message  
* wrote tests that validate all **GET** requests to `/cowsay` and assert that the **200** response is received, including the cowsay response message  
* wrote tests that validate any malformed reqeusts to `/cowsay` and assert that the **400** response is received, including the cowsay response message  
* wrote tests that validate all **POST** requests to `/cowsay` and assert that the **200** response is received, including the cowsay response message  
* wrrote tests that validate any malformed reqeusts to `/cowsay` and assert that the **400** response is received, including the cowsay response message  

#### ready to push to github   
