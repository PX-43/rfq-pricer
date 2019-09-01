import express from 'express';
import path from 'path';
import http from 'http';
import websocket from 'ws';
import {handleRequest} from './modules/messageHandlers/messageService'
import * as errors from './modules/utils/errorHelper'

const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = 'debug';

logger.debug('Server has started.');
logger.debug(`Default port: ${process.env.PORT}`);

const app = express();

const server = http.createServer(app);
app.use('/', express.static(path.resolve(path.join(__dirname, '../public'))));
app.get('/', (req, res) => {
    logger.debug('sending index.html');
    res.sendFile('/index.html');
});

try{
    logger.debug('Creating websocket server.');
    const wss = new websocket.Server({ port: 443 });
    logger.debug('Websocket server has been created.');
    wss.on('connection', ws => {
        logger.debug('client connected');
        ws.on('message', incomingMsg => {
            handleRequest(JSON.parse(incomingMsg), (topic, outgoingMsg, err = null) => {
                try{
                    const data = JSON.stringify({ topic, payload: outgoingMsg, err });
                    logger.debug('SENDING: ' + data);
                    ws.send(data);
                } catch (exception){
                    logger.error('ERROR while sending response to client.', exception);
                }
            });
        });

        ws.on('error', err => errors.hasClientDisconnected(err) ?
            logger.debug('Client has disconnected.') :
            logger.error('Error when disconnecting.', err));
    });

    wss.on('close', function close() {
        logger.debug('disconnected');
    });
} catch (e) {
    logger.error('An error has occurred in websocket communication.', e);
}

server.listen(process.env.PORT || 8080, () => {
    logger.debug('Listening on %d', server.address().port);
    console.log('Listening on %d', server.address().port);
});
