import express from 'express';
import path from 'path';
import http from 'http';
import websocket from 'ws';
import {handleRequest} from './modules/messageHandlers/messageService'
import * as errors from './modules/utils/errorHelper'

const app = express();

const server = http.createServer(app);
app.use('/', express.static(path.resolve(path.join(__dirname, '../public'))));
app.get('/', (req, res) => {
    console.log('sending index.html');
    res.sendFile('/index.html');
});

const wss = new websocket.Server({ port: 443 });
wss.on('connection', ws => {
    console.log('client connected');
    ws.on('message', incomingMsg => {
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


server.listen(80, () => {
    console.log('Listening on %d', server.address().port);
});
