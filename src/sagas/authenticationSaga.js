import { put, call, takeLatest } from 'redux-saga/effects';
import axios from "axios";

import * as consts from '../consts'

function fetchUser(config) {
  return axios(config);
}


function* loginSaga(request) {
  try {
    //config = JSON.stringify(config)
    //const user = JSON.stringify(request.config.username)
    const pw = request.config.password
    const user = request.config.username
    //const data = JSON.stringify(`{"username": ${user}, "password": ${pw}}`)

    const config = {
      method: 'post',
      url: `${consts.WORKLIST_API}/token`,
      data: {
        "username": user,
        "password": pw
      }
    };

    //console.log(`fetch: ${ user}, ${pw}`)

    //user =  JSON.stringify(request)

    const response = yield call(fetchUser, config);


    yield [
      put({ type: "LOGIN_USER_SUCCESS", response })
    ];
  } catch (error) {
    yield put({ type: "LOGIN_USER_ERROR", error })
  }
}


export function* watchUserAuthentication() {
  yield takeLatest("LOGIN_USER", loginSaga);
}