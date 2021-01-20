
import * as constAction from '../consts'

import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";



// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherGetVsf() {
  yield takeLatest(constAction.API_VSF_REQUEST, workerGetVsf);
  yield takeLatest(constAction.API_SKIP_REQUEST, workerGetSkip);
}


export function* workerGetVsf(request) {
  
  try {
    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/visit-form/`,
      headers: { 
        'Authorization': `Bearer ${request.config.token_value}`
      },
      data : {
        'appl_id': request.config.appl_id,
      }
    }

    // console.log(config)
    const response = yield call(axios, config);
    const data = response.data;
    
    yield put({ type: constAction.API_VSF_SUCCESS, content: data });



  } catch (error) {
    yield put({ type: constAction.API_VSF_FAILURE, error: error });
  }
}

export function* workerGetSkip(request) {
  
  try {
    let config = {
      method: 'get',
      url: `https://skip.lgm.com.vn/api?id_no=${request.config.id_no}`,
    }

    const response = yield call(axios, config);
    const data = response.data;
    
    yield put({ type: constAction.API_SKIP_SUCCESS, content: data });
    

  } catch (error) {
    yield put({ type: constAction.API_SKIP_FAILURE, error:error });
  }
}

