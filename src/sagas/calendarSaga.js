
import * as constAction from '../consts'
import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSagaCalendar() {
  yield takeLatest(constAction.API_CALENDAR_REQUEST, workerGetCalendar);
}

// function that makes the api request and returns a Promise for response
// worker saga: makes the api call when watcher saga sees the action ${request.config.start}


export function* workerGetCalendar(request) {
  try {
    const config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/calendar?type=get&staff_id=${request.config.staff_id}`,
      headers: {
        'Authorization': `Bearer ${request.config.token}`,
      },
    };
    const response = yield call(axios, config);
    const data = response.data
    //console.log(data)
    yield put({ type: constAction.API_CALENDAR_SUCCESS, content: data });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_CALENDAR_FAILURE, error: error });
  }
}


