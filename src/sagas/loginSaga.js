
import * as constAction from '../consts'
import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";
import {decode as atob, encode as btoa} from 'base-64'

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(constAction.API_TOKEN_REQUEST, workerGetToken);
  yield takeLatest(constAction.STAFF_CHECKIN_PULL, workerGetStaffCheckinUpdate);
  // yield takeLatest(constAction.MANAGER_CLEAR_STATE, workerManagerClearState);
}

// function that makes the api request and returns a Promise for response



// worker saga: makes the api call when watcher saga sees the action
export function* workerGetToken(request) {
  try {
    const config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/login`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+btoa(request.config.username+ ":" + request.config.password)
      },  
      data : {
        //"username": request.config.username,
        //"password": request.config.password,
        "lat": request.config.lat,
        "lon": request.config.lon,
        "device_brand": request.config.device_brand,
        "device_os": request.config.device_os,
        "device_name": request.config.device_name,
      }
    };

    const response = yield call(axios, config);
    const data = response.data;

    // dispatch a success action to the store with the new dog

    yield put({ type: constAction.API_TOKEN_SUCCESS, content: data });

    // get appls data
    if (data.role === 'FC') {
      yield call(workerGetData, data.access);
    } 
    else {
      yield call(workerGetStaffInfo, data.access);
      yield call(workerGetStaffCheckin, data.access);
      yield put({type: constAction.STAFF_CAL_DASH});
    }
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_TOKEN_FAILURE, error });
  }
}


export function* workerManagerUpdate(token) {
  yield call(workerGetStaffInfo, token);
  yield call(workerGetStaffCheckin, token);
  yield put({type: constAction.STAFF_CAL_DASH});
}

export function* workerGetData(token) {
  try {
    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/portfolio-list/`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    }
    
    const response = yield call(axios, config);
    const data = response.data;
    
    // dispatch a success action to the store with the new content
    yield put({ type: constAction.API_DATA_SUCCESS, content: response.data });

    // dispatch INIT_DASHBOARD
    //yield put({ type: constAction.INIT_DASHBOARD, content: data });
    // yield put({ type: constAction.DATA_INIT_DASHBOARD });

    
    // dispatch CAL-DASH
    yield put({ type: constAction.CAL_TOTAL_DASH, data: response.data});
    yield put({ type: constAction.CAL_TODO_DASH, data: response.data});
    yield put({ type: constAction.CAL_CATE_DASH, data: response.data});
    yield put({ type: constAction.CAL_TREE_DASH, data: response.data});
    
    // dispatch UPDATE_SHOWLIST
    // const allAppls =  Object.values(data).map(appl => appl.appl_id)
    yield put({ type: constAction.UPDATE_SHOWLIST, content: Object.values(data)});

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
    
    yield put({ type: constAction.STAFF_INFO_REQUEST});
    const response = yield call(axios, config);
    const data = response.data
    yield put({ type: constAction.STAFF_INFO_SUCCESS, content: data});

    //yield call(workerGetCheckin, request.config.token);

  } catch (error) {
    // dispatch a failure action to the store with the error
    console.log(error)
    //yield put({ type: constAction.API_PAYMENT_FAILURE, error: error });
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
    
    yield put({ type: constAction.STAFF_CHECKIN_REQUEST});
    const response = yield call(axios, config);
    const data = response.data
    yield put({ type: constAction.STAFF_CHECKIN_SUCCESS, content: data});

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
    yield put({ type: constAction.STAFF_CHECKIN_UPDATE, content: data});
    yield call(workerGetStaffInfo, request.config.token);
    yield put({type: constAction.STAFF_CAL_DASH});

  } catch (error) {
    // dispatch a failure action to the store with the error
    console.log(error)
    //yield put({ type: constAction.API_PAYMENT_FAILURE, error: error });
  }
}



// export function* workerManagerGetData(request) {
//   try {
//     let config = {
//       method: 'post',
//       url: `${constAction.WORKLIST_API}/portfolio-list/?staff_id=${request.config.staff_id}`,
//       headers: { 
//         'Authorization': `Bearer ${request.config.token}`
//       }
//     }
    
//     const response = yield call(axios, config);
//     const data = response.data;
    
//     // dispatch a success action to the store with the new content
//     yield put({ type: constAction.API_DATA_SUCCESS, content: response.data });

//     // dispatch INIT_DASHBOARD
//     //yield put({ type: constAction.INIT_DASHBOARD, content: data });
//     // yield put({ type: constAction.DATA_INIT_DASHBOARD });

//     // dispatch CAL-DASH
//     yield put({ type: constAction.CAL_TOTAL_DASH, data: response.data});
//     yield put({ type: constAction.CAL_TODO_DASH, data: response.data});
//     yield put({ type: constAction.CAL_CATE_DASH, data: response.data});
//     yield put({ type: constAction.CAL_TREE_DASH, data: response.data});
    
//     // dispatch UPDATE_SHOWLIST
//     // const allAppls =  Object.values(data).map(appl => appl.appl_id)
//     // yield put({ type: constAction.UPDATE_SHOWLIST, content: allAppls});
//     yield put({ type: constAction.UPDATE_SHOWLIST, content: Object.values(data)});

//   } catch (error) {
//     console.log(error)
//     // dispatch a failure action to the store with the error
//     yield put({ type: constAction.API_DATA_FAILURE, error });
//   }
// }


export function* workerManagerClearState(request) {
  try {
    
    yield put({ type: constAction.DATA_CLEAR});
    yield put({ type: constAction.UPTRAIL_CLEAR});
    yield put({ type: constAction.SHOWLIST_CLEAR});

  } catch (error) {
    console.log(error)
  }
}