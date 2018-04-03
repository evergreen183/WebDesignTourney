const http = require('http');
const fs = require('fs');
const qs = require('querystring');
//const tournController = require('./controller/tournament');

const PORT = 3000;

/** @function handleRequest
  * Handles requests to the webserver by processing any new tournament additions submitted
  * through an HTTP request.
  * @param {http.ClientRequest} req - the client request object
  * @param {htt.ServerResponse} res - the server response object
  */
function handleRequest(req, res) {
  // Check for form submittal
  if(req.method === "POST") {
    var body = '';

  req.on('data', function(data) {
    body += data
  });

  req.on('end', function() {
    var data = qs.parse(body);
    req.body = data;
    console.log(req.body);
  });
   
    //tournController.create(req, res);
  } else {
        var querystring = require('querystring');
        var query = querystring.parse(req.url.split('?')[1]);
        req.query =  query;
      
        
      
        url ="http://www.localhost:3000" + req.query.title;
        body = "Goodbye cruel localhost";
        res.writeHead(301, {
             'Location': url,
             'Content-Length': body.length,
             'Content-Type': 'text/plain' });

        res.end(body);
    //tournController.list(req, res);
  }
}

// Create the webserver
var server = http.createServer(handleRequest);

// Start listening for HTTP requests
server.listen(PORT, function() {
  console.log("Listening at port ", PORT);
});
