import websocket from 'websocket'; //to make this work, run npm install websocket --save
import http from 'http';

const PORT = 1337;
const webSocketServer = websocket.server;

let clients = [];

let server = http.createServer(function(request, response) {});
server.listen(PORT, function() {
    console.log((new Date()) + " Server is listening on port " + PORT);
});

let wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just an enhanced HTTP request.
    httpServer: server
});

// This callback function is called every time someone tries to connect to the WebSocket server
wsServer.on('request', function(request) {

    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    // accept connection - you should check 'request.origin' to
    // make sure that client is connecting from your website
    let connection = request.accept(null, request.origin);
   // let index = clients.push(connection) - 1;
    let userName = false;
    console.log((new Date()) + ' Connection accepted.');

    // user sent some message
    connection.on('message', function(message) {
        if (message.type === 'utf8') { // accept only text
            // remember user name
            console.log('user says: ' + message.utf8Data);
            connection.sendUTF(JSON.stringify({ type:'color', data: 'hey you' }));
            console.log((new Date()) + 'message sent...');
        } else {
            console.log('NOT A text message!');
        }
    });


    // user disconnected
    connection.on('close', function(connection) {
        console.log('client disconnected...');
    });
});