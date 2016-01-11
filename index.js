var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

