import { eventChannel } from 'redux-saga';
import { takeEvery, put, call, take, all } from 'redux-saga/effects';
import * as actions from '../actions';

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

function* initializeWebSocketsChannel(action) {
  try{
    const socket = new WebSocket(`ws://${action.connectionDetails.server}:${action.connectionDetails.port}`);
    const channel = yield call(createEventChannel, socket);
    yield all([
      call(externalListener, channel),
      call(internalListener, socket)
    ]);
  } catch (err){
    yield put(actions.onConnectionError(err));
  }
}

function* externalListener(channel) {
  console.log('external listener is starting');
  while (true) {
    try{
      const msg = yield take(channel);
      if(msg === CONN_ERR){
        yield put(actions.onConnectionError('Websocket connection error occurred.'));
      } else if(msg === CONN_OPEN){
        yield put(actions.connectedSuccessfully());
      } else if(msg != null){
        yield put(actions.onMessageReceived(JSON.parse(msg)));
      }
    } catch (webSocketError){
      yield put(actions.onConnectionError(webSocketError));
    }
  }
}

function* internalListener(socket) {
  console.log('internal listener is starting');
  while (true) {
    const message = yield take(actions.types.SEND_REQUEST);
    socket.send(JSON.stringify(message));
  }
}

export default function* connectSaga() {
  yield takeEvery(actions.types.ESTABLISH_CONNECTION, initializeWebSocketsChannel);
}


