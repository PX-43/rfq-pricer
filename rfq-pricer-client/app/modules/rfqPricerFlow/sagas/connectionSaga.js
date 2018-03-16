import {takeEvery, eventChannel} from 'redux-saga';
import {put, call, take, all} from 'redux-saga/effects';
import * as actions from '../actions';


function createEventChannel(socket) {
  return eventChannel(emit => {
    socket.onmessage(message => emit(message));
    socket.onerror(err => emit(new Error(err)));
    return () => socket.close();
  });
}

function* initializeWebSocketsChannel(connectionDetails) {
  try{
    const socket = new WebSocket(`ws://${connectionDetails.server}:${connectionDetails.port}`);
    const channel = yield call(createEventChannel, socket);
    yield put(actions.connectedSuccessfully()); //todo: should this be done in the 'onopen' callback?
    yield all([call(externalListener, channel), call(internalListener, socket)]);
  } catch (err){
    yield put(actions.onConnectionError(err));
  }
}

//todo: https://medium.com/@ebakhtarov/bidirectional-websockets-with-redux-saga-bfd5b677c7e7

function* externalListener(channel) {
  while (true) {
    try{
      const {message} = yield take(channel);
      yield put(actions.onMessageReceived(JSON.parse(message)));
    } catch (webSocketError){
      yield put(actions.onConnectionError(webSocketError));
    }
  }
}

function* internalListener(socket) {
  while (true) {
    const message = yield take(actions.SEND_REQUEST);
    socket.send(JSON.stringify(message));
  }
}

export function* connectSaga() {
  yield [
    takeEvery(actions.ESTABLISH_CONNECTION, initializeWebSocketsChannel)
  ];
}


