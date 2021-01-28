
import * as constAction from '../consts'

import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";



// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSetTodo() {
  yield takeLatest(constAction.API_TODO_REQUEST, workerSetTodo);
}


export function* workerSetTodo(request) {

  try {
    let config = {
      method: 'put',
      url: `${constAction.WORKLIST_API}/appls-list/`,
      headers: {
        'Authorization': `Bearer ${request.config.token_value}`
      },
      data: {
        'appl_id': request.config.appl_id,
        'todo_value': request.config.todo_value
      }
    }
    //console.log(config)
    const response = yield call(axios, config);
    const data = response.data;

    yield put({
      type: constAction.CHANGE_TODO,
      content: {
        'appl_id': request.config.appl_id,
        'todo_flag': request.config.todo_value
      }
    });

    //yield put({ type: constAction.CAL_TODO_DASH });

  } catch (error) {
    console.log(error)
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_TODO_FAILURE, error });
  }
}
