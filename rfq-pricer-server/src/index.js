import express from 'express';
import http from 'http';
import websocket from 'ws';
import {handleRequest} from './modules/messageHandlers/messageService'
import * as errors from './modules/utils/errorHelper'

const PORT = 1337;
const app = express();

const server = http.createServer(app);
const wss = new websocket.Server({ server });

wss.on('connection', (ws, req) => {

    ws.on('message', incomingMsg => {
        console.log('received: %s', incomingMsg);
        handleRequest(JSON.parse(incomingMsg), outgoingMsg => {
            try{
                const data = JSON.stringify({ data: outgoingMsg });
                ws.send(data);
            } catch (err){
                console.log('ERROR while sending response to client : ' + err);
            }


        });
    });

    ws.on('error', err => errors.hasClientDisconnected(err) ?
                                    console.log('Client has disconnected.') :
                                    console.log(err));

});

wss.on('close', function close() {
    console.log('disconnected');
});


server.listen(PORT, () => {
    console.log('Listening on %d', server.address().port);
});