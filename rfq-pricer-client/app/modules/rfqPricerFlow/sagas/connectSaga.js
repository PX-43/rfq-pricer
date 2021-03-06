import { eventChannel } from 'redux-saga';
import { takeEvery, put, call, take, all } from 'redux-saga/effects';
import * as actions from '../actions';
import handleResponse from '../services/response/responseService';

const CONN_ERR = 'connection_error';
const CONN_OPEN = 'connection_open';

function createEventChannel(socket) {
  return eventChannel(emit => {
    socket.onopen = () => emit(CONN_OPEN);
    socket.onmessage = message => emit(message);
    socket.onerror = err => {
      console.log('A connection error has occurred. Error: ' + err.message);
      emit(CONN_ERR);
    };

    return () => socket.close();
  });
}

function* initializeWebSocketsChannel(dispatch, action) {
  try{
    const {protocol, server} = action.connectionDetails;
    const port = 443;
    console.log(protocol, server);
    const url = `${protocol}://${server}:${port}`;
    console.log(`WEBSOCKET URL: ${url}`);
    const socket = new WebSocket(url);
    const channel = yield call(createEventChannel, socket);
    yield all([
      call(listenForServerResponse, channel, dispatch),
      call(listenForActions, socket)
    ]);
  } catch (err){
    yield put(actions.onConnectionError('WebSocket initialisation error. Error: ' + err));
  }
}

function* listenForServerResponse(channel, dispatch) {
  console.info('external listener is starting');
  while (true) {
    try{
      const msg = yield take(channel);
      if(msg === CONN_ERR){
        yield put(actions.onConnectionError('Websocket connection error occurred.'));
      } else if(msg === CONN_OPEN){
        yield put(actions.connectedSuccessfully());
      } else if(msg != null){
        yield call(handleResponse, msg, dispatch);
      }
    } catch (webSocketError){
      yield put(actions.onConnectionError('Error in external listener: ' + webSocketError));
    }
  }
}

function* listenForActions(socket) {
  console.info('internal listener is starting');
  while (true) {
    const message = yield take(actions.types.SEND_REQUEST);
    socket.send(JSON.stringify(message.data));
  }
}

export default function* connectSaga(dispatch) {
  yield takeEvery(actions.types.ESTABLISH_CONNECTION, initializeWebSocketsChannel, dispatch);
}


