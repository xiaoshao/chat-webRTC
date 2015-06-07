/**
 * Created by zwshao on 5/3/15.
 */

var express = require("express");
var app = express();
var server = require('http').createServer(app);

server.listen(3000, function () {
    console.log("Listening on 3000");
});

app.get("/", function (req, resp) {
    resp.sendFile(__dirname + "/index.html");
});

var websocketServer = require("ws").Server;

var wss = new websocketServer({server: server});

var clients = [];
wss.on("connection", function (client) {
    console.log("connect....");
    clients.push(client);
    client.send("{type: 'textMessage', data: { message: 'hello world!'}}", function (error) {
        if (error) {
            console.log("send message error : " + error);
        }
    });

    client.onmessage = function (msg) {
        //When get message from client
        console.log(msg.data);
        sendMessage(msg, client);

    };

});

//send message to clients without self
function sendMessage(msg, client) {

    for (cli in clients) {
        if (cli === client) {
            continue;
        }
        cli.send(msg);
    }
}