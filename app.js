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

var wss = new websocketServer({server:server});

var clients = [];
wss.on("connection", function(client){
    console.log(client + "connected.");

    clients.push(client);

    client.on("message", function(message){
        console.log("received:" + message);
        sendMessage(message);
    });
});

function sendMessage(message){
    for(var index =0;  index < clients.length; index ++){
        var cls = clients[index];
        cls.send(message, function(error){
            if(error){
                console.log("send to client error." + error);
            }
        });
    }
}