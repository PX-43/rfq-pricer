import { takeEvery, put } from "redux-saga/effects";
import { types, sendRequest } from "../actions";
import { topics } from '../../../constants/index';


function* createRequest(dispatch, action) {
  switch (action.type){
    case types.SEND_NEW_RFQ_REQUEST:
      const rfqCount = action.rfqCount;
      yield put(sendRequest(topics.SUBSCRIBE_RFQ, {rfqCount}));
      break;
    default:
      throw new Error('This action type is not supported for sending requests: ' + action.type);
  }
}

export default function* requestSaga(dispatch) {
  yield takeEvery([
    types.SEND_NEW_RFQ_REQUEST, // add more request actions...
  ], createRequest, dispatch);
  // note: takeEvery will add the incoming action to the argument list
  // (i.e. the action will be the last argument provided to saga)
}
