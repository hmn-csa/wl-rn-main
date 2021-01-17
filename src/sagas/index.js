//https://viblo.asia/p/tim-hieu-ve-react-redux-saga-xay-dung-ung-dung-don-gian-63vKjVAkK2R
// https://viblo.asia/p/redux-saga-gAm5yqLA5db

// Imports: Dependencies
import { all, fork } from 'redux-saga/effects';

// Imports: Redux Sagas
// import { watchIncreaseCounter, watchDecreaseCounter } from './counterSaga';
import { watcherSaga } from './loginSaga'
import { watcherSetTodo } from './todoSaga'
import { watcherGetVsf } from './vsfSaga'
import { watcherSagaUptrail} from './uptrailSaga'
import { watcherSagaCheckin } from './checkinSaga'
import { watcherSagaPayment } from './paymentSaga'

// Redux Saga: Root Saga
export function* rootSaga () {
  yield all([
    fork(watcherSaga),
    fork(watcherSetTodo),
    fork(watcherGetVsf),
    fork(watcherSagaUptrail),
    fork(watcherSagaCheckin),
    fork(watcherSagaPayment),
  ]);
};

