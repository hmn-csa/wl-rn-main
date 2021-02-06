
import * as constAction from '../consts'
import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";
import { decode as atob, encode as btoa } from 'base-64'
// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(constAction.API_TOKEN_REQUEST, workerGetToken);
  yield takeLatest(constAction.STAFF_CHECKIN_PULL, workerGetStaffCheckinUpdate);

  yield takeLatest(constAction.SET_STAFF_MODE, workerGetDataFCMode);
  // yield takeLatest(constAction.MANAGER_CLEAR_STATE, workerManagerClearState);
}


export function* workerGetToken(request) {
  try {
    const config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/login`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(request.config.username + ":" + request.config.password)
      },
      data: {
        "lat": request.config.lat,
        "lon": request.config.lon,
        "device_brand": request.config.device_brand,
        "device_os": request.config.device_os,
        "device_name": request.config.device_name,
      }
    };

    const response = yield call(axios, config);
    const data = response.data;

    yield put({ type: constAction.API_TOKEN_SUCCESS, content: data });
    // get appls data
    if (data.role === 'FC') {
      yield call(workerGetDataFC, { token: data.access, staff_id: data.staff_id, fc_name: data.fc_name });
    }
    else {
      yield call(workerGetStaffInfo, data.access);
      yield call(workerGetStaffCheckin, data.access);
      yield put({ type: constAction.STAFF_CAL_DASH });
    }
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_TOKEN_FAILURE, error: 'Sai tài khoản hoặc mật khẩu' });
  }
}


/* ------------------ FC App ------------------ */
export function* workerGetDataFC(token) {
  try {
    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/portfolio-list/`,
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
    }

    const response = yield call(axios, config);
    const data = response.data;

    // dispatch a success action to the store with the new content
    yield put({ type: constAction.API_DATA_SUCCESS, content: response.data });

    // set active FC
    yield put({
      type: constAction.SET_ACTIVE_STAFF, content: {
        staff_id: token.staff_id,
        info: {
          fc_name: token.fc_name
        }
      }
    })
    // type: constAction.SET_ACTIVE_STAFF,
    // content

    // dispatch CAL-DASH

    yield put({ type: constAction.CAL_TODO_DASH });
    yield put({ type: constAction.CAL_TOTAL_DASH });
    yield put({ type: constAction.CAL_TREE_DASH });
    yield put({ type: constAction.CAL_CATE_DASH });


    // dispatch UPDATE_SHOWLIST
    yield put({ type: constAction.UPDATE_SHOWLIST, content: Object.values(data) });

    // Get Checkin
    yield put({
      type: constAction.API_GETCHECKIN_REQUEST,
      config: {
        staff_id: token.staff_id,
        token: token.token,
        date: "",
      }
    });

    // Get Uptrail
    yield put({
      type: constAction.API_UPTRAIL_REQUEST,
      config: {
        staff_id: token.staff_id,
        token: token.token,
        loaddate: "",
      }
    });



  } catch (error) {
    console.log(error)
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_DATA_FAILURE, error });
  }
}


/* ------------------ Manager App ------------------ */
export function* workerGetDataFCMode(request) {
  try {
    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/portfolio-list/?staff_id=${request.token.staff_id}`,
      headers: {
        'Authorization': `Bearer ${request.token.token}`
      },
    }


    const response = yield call(axios, config);
    const data = response.data;
    // dispatch a success action to the store with the new content
    yield put({ type: constAction.API_DATA_SUCCESS, content: response.data });

    // set active FC
    yield put({
      type: constAction.SET_ACTIVE_STAFF, content: {
        staff_id: request.token.staff_id,
        info: {
          fc_name: request.token.fc_name
        }
      }
    })

    // dispatch CAL-DASH

    yield put({ type: constAction.CAL_TODO_DASH });
    yield put({ type: constAction.CAL_TOTAL_DASH });
    yield put({ type: constAction.CAL_TREE_DASH });
    yield put({ type: constAction.CAL_CATE_DASH });

    // dispatch UPDATE_SHOWLIST
    yield put({ type: constAction.UPDATE_SHOWLIST, content: Object.values(data) });

    // Get Checkin
    yield put({
      type: constAction.API_GETCHECKIN_REQUEST,
      config: {
        staff_id: request.token.staff_id,
        token: request.token.token,
        date: "",
      }
    });

    // Get Uptrail
    yield put({
      type: constAction.API_UPTRAIL_REQUEST,
      config: {
        staff_id: request.token.staff_id,
        token: request.token.token,
        loaddate: "",
      }
    });
  } catch (error) {
    console.log(error)
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_DATA_FAILURE, error });
  }
}


export function* workerGetStaffInfo(token) {
  try {
    const config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/manager-view?type=info`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    yield put({ type: constAction.STAFF_INFO_REQUEST });
    const response = yield call(axios, config);
    const data = response.data
    yield put({ type: constAction.STAFF_INFO_SUCCESS, content: data });


  } catch (error) {
    // dispatch a failure action to the store with the error
    console.log(error)
  }
}

export function* workerGetStaffCheckin(token) {
  try {
    const config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/manager-view?type=checkin`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    yield put({ type: constAction.STAFF_CHECKIN_REQUEST });
    const response = yield call(axios, config);
    const data = response.data
    yield put({ type: constAction.STAFF_CHECKIN_SUCCESS, content: data });

  } catch (error) {
    // dispatch a failure action to the store with the error
    console.log(error)
    //yield put({ type: constAction.API_PAYMENT_FAILURE, error: error });
  }
}

export function* workerGetStaffCheckinUpdate(request) {
  try {
    const config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/manager-view?type=update-checkin`,
      headers: {
        'Authorization': `Bearer ${request.config.token}`,
      },
      data: {
        last_pull: request.config.last_pull
      }
    }

    const response = yield call(axios, config)
    const data = response.data
    yield put({ type: constAction.STAFF_CHECKIN_UPDATE, content: data });
    yield call(workerGetStaffInfo, request.config.token);
    yield put({ type: constAction.STAFF_CAL_DASH });

  } catch (error) {
    // dispatch a failure action to the store with the error
    console.log(error)
    //yield put({ type: constAction.API_PAYMENT_FAILURE, error: error });
  }
}

export function* workerManagerClearState(request) {
  try {

    yield put({ type: constAction.DATA_CLEAR });
    yield put({ type: constAction.UPTRAIL_CLEAR });
    yield put({ type: constAction.SHOWLIST_CLEAR });

  } catch (error) {
    console.log(error)
  }
}