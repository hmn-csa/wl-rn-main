import { combineReducers } from 'redux'

import tokenReducers from './tokenReducers'
import vsfReducers from './vsfReducers'
import showListReducers from './showListReducers'
import dataReducers from './dataReducers'
import uptrailReducers from './uptrailReducers'
import managerReducers from './managerReducers'
import mapReducers from './mapReducers'
import paymentReducers from './paymentReducers'
import staffReducers from './staffReducers'
import calendarReducers from './calendarReducers'
import searchbarReducers from './searchbarReducers'



const rootReducer = combineReducers({
  token: tokenReducers,
  showlists: showListReducers,
  data: dataReducers,
  vsf: vsfReducers,
  uptrails: uptrailReducers,
  payments: paymentReducers,
  manager: managerReducers,
  map: mapReducers,
  staff: staffReducers,
  searchbar: searchbarReducers,
  calendar: calendarReducers,
})


export default (state, action) =>
  rootReducer(action.type === 'TOKEN_REMOVE' ? undefined : state, action);
// export default rootReducer