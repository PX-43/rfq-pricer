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

    console.log('client connected');

    ws.on('message', incomingMsg => {
        //console.log('received: %s', incomingMsg);
        handleRequest(JSON.parse(incomingMsg), (topic, outgoingMsg, err = null) => {
            try{
                const data = JSON.stringify({ topic, payload: outgoingMsg, err });
                console.info('SENDING: ' + data);
                ws.send(data);
            } catch (exception){
                console.log('ERROR while sending response to client : ' + exception);
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