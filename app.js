/**
 * Created by zwshao on 5/3/15.
 */

var express = require("express");
var app = express();
var server = require('http').createServer(app);

server.listen(3000, function(){
    console.log("Listening on 3000");
});

app.get("/", function(req, resp){
   resp.sendFile(__dirname + "/index.html");
});

var websocketServer = require("ws").Server;

