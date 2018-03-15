import {takeEvery, eventChannel} from 'redux-saga';
import {put, call, take} from 'redux-saga/effects';
import * as actions from '../actions';


function* createEventChannel(socket) {
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
    socket.onopen = () => yield put(actions.connectedSuccessfully());
    while (true) {
      try{
        const {message} = yield take(channel);
        yield put(actions.onMessageReceived(message));
      } catch (webSocketError){
        yield put(actions.onConnectionError(webSocketError));
      }
    }
  } catch (err){
    yield put(actions.onConnectionError(err));
  }
}

//todo: https://medium.com/@ebakhtarov/bidirectional-websockets-with-redux-saga-bfd5b677c7e7

function* internalListener(socket) {
  while (true) {
    const data = yield take('EXE_TASK');
    socket.send(JSON.stringify({ type: 'setTask', status: 'open' }))
  }
}

export function* connectSaga() {
  yield [
    takeEvery(actions.ESTABLISH_CONNECTION, initializeWebSocketsChannel)
  ];
}
