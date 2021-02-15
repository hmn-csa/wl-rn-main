
import * as constAction from '../consts'
import { Alert } from 'react-native'

import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";

export function* watcherChangePassword() {
  yield takeLatest(constAction.API_CHANGEPW_REQUEST, workerChangePw);
  yield takeLatest(constAction.API_CHANGE_AVATAR_REQUEST, workerChangeAvatar);
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

    const response = yield call(axios, config);
    alert("Mật khẩu mới thành công")
    yield put({ type: constAction.TOKEN_REMOVE });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_CHANGEPW_FAILURE, error: error });
  }
}


export function* workerChangeAvatar(request) {
  try {
    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/change-avatar`,
      headers: {
        'Authorization': `Bearer ${request.config.token}`
      },
      data: {
        'avatar': request.config.avatar
      }
    }
    const response = yield call(axios, config);
    yield put({ type: constAction.API_CHANGE_AVATAR_SUCCESS });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_CHANGE_AVATAR_FAILURE, error: error });
  }
}