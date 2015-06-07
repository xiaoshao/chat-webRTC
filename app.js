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
        sendMessage(msg.data, client);

    };

});

//send message to clients without self
function sendMessage(message, client) {

    for (var index = 0; index < clients.length; index++) {
        var cls = clients[index];

        if (cls != client) {
            cls.send(message, function (error) {
                if (error) {
                    console.log("send to client error." + error);
                }
            });
        }
    }
}