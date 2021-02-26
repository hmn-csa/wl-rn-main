
import * as constAction from '../consts'
import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSagaCalendar() {
  yield takeLatest(constAction.API_CALENDAR_REQUEST, workerGetCalendar);
  yield takeLatest(constAction.USER_CALENDAR_REMOVE, workerRemoveCalendar);
  yield takeLatest(constAction.USER_CALENDAR_UPDATE, workerUpdateCalendar);
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


export function* workerUpdateCalendar(request) {
  try {
    const config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/calendar?type=update&staff_id=${request.content.staff_id}`,
      headers: {
        'Authorization': `Bearer ${request.content.token}`,
      },
      data: {
        ...request.content
      }
    };
    const response = yield call(axios, config);
    const data = response.data
    //console.log(data)
    console.log(config)
    yield put({ type: constAction.USER_CALENDAR_UPDATE_SUCCESS, content: data });
  } catch (error) {
    // dispatch a failure action to the store with the error
    console.log(error)
    //yield put({ type: constAction.API_CALENDAR_UPDATE_FAILURE, error: error });
  }
}

export function* workerRemoveCalendar(request) {
  try {
    const config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/calendar?type=remove&staff_id=${request.content.staff_id}`,
      headers: {
        'Authorization': `Bearer ${request.content.token}`,
      },
      data: {
        ...request.content
      }
    };
    console.log(config)
    const response = yield call(axios, config);
    const data = response.data
    //console.log(data)
    yield put({ type: constAction.USER_CALENDAR_REMOVE_SUCCESS, content: data });
  } catch (error) {
    // dispatch a failure action to the store with the error
    console.log(error)
    //yield put({ type: constAction.API_CALENDAR_UPDATE_FAILURE, error: error });
  }
}