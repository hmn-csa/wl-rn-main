import { combineReducers } from 'redux'

import tokenReducers from './tokenReducers'
import vsfReducers from './vsfReducers'
import showListReducers from './showListReducers'
import dataReducers from './dataReducers'
import todoReducers from './todoReducers'
import treeReducers from './treeReducers'
import totalReducers from './totalReducers'
import categoryReducers from './categoryReducers'
import uptrailReducers from './uptrailReducers'
import managerReducers from './managerReducers'
import mapReducers from './mapReducers'
import paymentReducers from './paymentReducers'
import staffReducers from './staffreducers'

const rootReducer  = combineReducers({
    token: tokenReducers,
    showlists: showListReducers,
    data: dataReducers,
    vsf: vsfReducers,
    todoCal: todoReducers,
    treeCal: treeReducers,
    totalCal: totalReducers,
    category: categoryReducers,
    uptrails: uptrailReducers,
    payments: paymentReducers,
    manager: managerReducers,
    map: mapReducers,
    staff: staffReducers,
})

export default rootReducer