
import * as constAction from '../consts'
import { Alert } from 'react-native'

import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";

export function* watcherChangePassword() {
  yield takeLatest(constAction.API_CHANGEPW_REQUEST, workerChangePw);
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* workerChangePw(request) {
  try {
    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/change-pw`,
      headers: {
        'Authorization': `Bearer ${request.config.token}`
      },
      data: {
        'new_password': request.config.newPw
      }
    }
    console.log(config)

    const response = yield call(axios, config);
    console.log(response)


    //yield put({ type: constAction.API_CHANGEPW_SUCCESS, content: data });
    // get appls data
    //alert("Mật khẩu mới thành công")
    yield put({ type: constAction.TOKEN_REMOVE });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_CHANGEPW_FAILURE, error: error });
  }
}