import express from 'express';
import http from 'http';
import url from 'url';
import websocket from 'ws';

const PORT = 1337;
const app = express();

const server = http.createServer(app);
const wss = new websocket.Server({ server });

wss.on('connection', (ws, req) => {

    ws.on('message', message => console.log('received: %s', message));
    ws.on('error', error => console.log(error));

    ws.send(JSON.stringify({ data: 'hey you' }));

});

wss.on('close', function close() {
    console.log('disconnected');
});




server.listen(PORT, () => {
    console.log('Listening on %d', server.address().port);
});