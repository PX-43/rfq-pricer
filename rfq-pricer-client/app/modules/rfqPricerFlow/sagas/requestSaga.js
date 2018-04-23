import { takeEvery, put, select } from "redux-saga/effects";
import { types, sendRequest } from "../actions";
import { topics } from '../../../constants/index';
import { rfqSelector } from '../../selectors';


function* createRequest(dispatch, action) {
  switch (action.type){
    case types.SEND_NEW_RFQ_REQUEST:
      const rfqCount = action.rfqCount;
      yield put(sendRequest(topics.SUBSCRIBE_RFQ, {rfqCount}));
      break;
    case types.ON_REJECT :
      const rfqId = action.rfqId;
      //const rfq = yield select(rfqSelector.getRfqData, action.rfqId); //works!
      yield put(sendRequest(topics.REJECT_RFQ, {rfqId}));
      break;
    default:
      throw new Error('This action type is not supported for sending requests: ' + action.type);
  }
}

export default function* requestSaga(dispatch) {
  yield takeEvery([
    types.SEND_NEW_RFQ_REQUEST, types.ON_REJECT
  ], createRequest, dispatch);
  // note: takeEvery will add the incoming action to the argument list
  // (i.e. the action will be the last argument provided to saga)
}
