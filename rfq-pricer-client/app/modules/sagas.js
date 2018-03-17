import { all, call } from 'redux-saga/effects';
import connectSaga from './rfqPricerFlow/sagas/connectSaga';

export default function* saga() {
  yield all([
    call( connectSaga ),
    ])
}
