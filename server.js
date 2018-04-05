const http = require('http');
const fs = require('fs');
const qs = require('querystring');
var index = fs.readFileSync('index.html');
//const tournController = require('./controller/tournament');

const PORT = 3000;

/** @function handleRequest
  * Handles requests to the webserver by processing any new tournament additions submitted
  * through an HTTP request.
  * @param {http.ClientRequest} req - the client request object
  * @param {htt.ServerResponse} res - the server response object
  */
function handleRequest(req, res) {
    res.statusCode = 200;
  // Check for form submittal
  if(req.method === "POST") {
    
      // Happens when called from website to make tournament
      
      var body = '';

      req.on('data', function(data) {
        body += data
      });

      req.on('end', function() {
        var data = qs.parse(body);
        req.body = data;
        console.log(req.body);
      });
      
      //TODO: Save incoming data(req.body) into database
      
      
      res.end('Send user to tournament bracket page\n');
      
       /*
        url ="http://www.localhost:3000" + tournid;
        body = "Goodbye cruel localhost";
        res.writeHead(301, {
             'Location': url,
             'Content-Length': body.length,
             'Content-Type': 'text/plain' });

        res.end(body);
        */
      
   
    //tournController.create(req, res);
      
  } else {
        var query = req.url.split('/')[1];
        
        req.query =  query;
      
        
        if(req.query == "" || req.query == "create"){
            console.log("create bracket " + query );
            
            res.end(index);
        }else if(req.query.indexOf('.') !== -1){
                 fs.readFile(req.query, function(err, html){ 
                    if(err){
                      res.writeHead(404);
                      res.write("Not Found!");
                    }
                    else{
                      res.writeHead(200);
                      res.write(html);
                    }
                    res.end();
                  });
        }else{
            
        
            
            //find tournament info based on req.query which is tournament id
                //if tournament id is found it will display info
                
                //else it will display 404 error
            
            console.log("Find tournament: " + query);
            res.end(query);
        }
      
      
    //tournController.list(req, res);
  }
}

// Create the webserver
var server = http.createServer(handleRequest);

// Start listening for HTTP requests
server.listen(PORT, function() {
  console.log("Listening at port ", PORT);
});

