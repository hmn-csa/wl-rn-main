
import * as constAction from '../consts'
import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSagaUptrail() {
  yield takeLatest(constAction.API_UPTRAIL_REQUEST, workerGetUptrail);
  yield takeLatest(constAction.DAILY_UPTRAIL_REQUEST, workerGetDailyUptrail);
  yield takeLatest(constAction.USER_UPTRAIL_REQUEST, workerUserUptrail);
  yield takeLatest(constAction.MORE_UPTRAIL_REQUEST, workerGetMoreUptrail);
  yield takeLatest(constAction.APPLID_UPTRAIL_REQUEST, workerGetApplidUptrail);
}


// function that makes the api request and returns a Promise for response
// worker saga: makes the api call when watcher saga sees the action ${request.config.start}

export function* workerGetUptrail(request) {

  try {
    const config = {
      method: 'get',
      url: `${constAction.WORKLIST_API}/uptrail?staff_id=${request.config.staff_id}&loaddate=${request.config.loaddate}`,
      headers: {
        'Authorization': `Bearer ${request.config.token}`,
      },
    };
    // console.log(config)
    const response = yield call(axios, config);
    //const data = response.data;
    // dispatch a success action to the store with the new dog
    yield put({ type: constAction.API_UPTRAIL_SUCCESS, content: response.data });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_UPTRAIL_FAILURE, error });
  }
}

export function* workerGetApplidUptrail(request) {

  try {
    const config = {
      method: 'get',
      url: `${constAction.WORKLIST_API}/uptrail?loadapplid=${request.config.loadapplid}`,
      headers: {
        'Authorization': `Bearer ${request.config.token}`,
      },
    };
    // console.log(config)
    const response = yield call(axios, config);
    //const data = response.data;

    yield put({
      type: constAction.APPLID_UPTRAIL_SUCCESS,
      content: response.data
    });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_UPTRAIL_FAILURE, error });
  }
}



export function* workerGetDailyUptrail(request) {
  try {
    const config = {
      method: 'get',
      url: `${constAction.WORKLIST_API}/uptrail?staff_id=${request.config.staff_id}&loaddate=${request.config.loaddate}`,
      headers: {
        'Authorization': `Bearer ${request.config.token}`,
      },
    };

    const response = yield call(axios, config);

    // dispatch a success action to the store with the new dog
    yield put({ type: constAction.DAILY_UPTRAIL_SUCCESS, content: response.data });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_UPTRAIL_FAILURE, error });
  }
}


export function* workerGetMoreUptrail(request) {

  try {
    const config = {
      method: 'get',
      url: `${constAction.WORKLIST_API}/uptrail?staff_id=${request.config.staff_id}&loadfrom=${request.config.loadfrom}`,
      headers: {
        'Authorization': `Bearer ${request.config.token}`,
      },
    };

    const response = yield call(axios, config);
    //const data = response.data;
    // dispatch a success action to the store with the new dog
    yield put({ type: constAction.MORE_UPTRAIL_SUCCESS, content: response.data });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_UPTRAIL_FAILURE, error });
  }
}


export function* workerUserUptrail(request) {
  try {

    let dataContent = {
      ...request.config,
    }

    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/uptrail`,
      headers: {
        'Authorization': `Bearer ${request.config.token_value}`
      },
      data: dataContent
    }

    const response = yield call(axios, config);
    // dispatch a success action to the store with the new content
    dataContent = { ...dataContent, runtime: response.data.message }
    yield put({ type: constAction.USER_UPTRAIL_SUCCESS, content: dataContent });

    alert(`Uptrail thành công: \nHợp đồng: ${dataContent.appl_id}\nKhách hàng: ${dataContent.cust_name}`)
    // dispatch CAL-DASH


  } catch (error) {
    console.log(error)
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.USER_UPTRAIL_FAILURE, error });
    alert(`Uptrail không thành công vui lòng thực hiện lại: \nHợp đồng: ${dataContent.appl_id}\nKhách hàng: ${dataContent.cust_name}`)
  }
}


