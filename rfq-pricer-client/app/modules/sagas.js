import { all, call } from 'redux-saga/effects';
import connectSaga from './rfqPricerFlow/sagas/connectSaga';
import requestSaga from "./rfqPricerFlow/sagas/requestSaga";

export default function* saga(dispatch) {
  yield all([
    call( connectSaga, dispatch ),
    call( requestSaga, dispatch ),
    ])
}
