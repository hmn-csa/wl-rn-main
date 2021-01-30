import * as constAction from "../consts/index";


const initialState = {
  'todoCase': {
    'case': 0,
    'applIds': []
  },
  'todoFollowed': {
    'case': 0,
    'applIds': []
  },
  'todoPaid': {
    'case': 0,
    'applIds': []
  },
  'todoPtp': {
    'case': 0,
    'applIds': []
  },
  'todoBptp': {
    'case': 0,
    'applIds': []
  },
  'todoRevisit': {
    'case': 0,
    'applIds': []
  },
  error: false,
  error_applid: null,

}



const todoReducers = (state = initialState, action) => {

  switch (action.type) {
    // get data 
    case constAction.CAL_TODO_DASH:
      let appls = Object.values(action.data)
      // ======== todos ==========
      let todoAppls = appls.filter((appl) => {
        return appl.todo_flag == 1
      })
      let todoFollowedAppls = todoAppls.filter((appl) => {
        return appl.followed == 1
      })
      let todoPaidAppls = todoAppls.filter((appl) => {
        return appl.total_pay_amount > 0
      })
      let todoPtpAppls = todoAppls.filter((appl) => {
        return appl.last_action_code === 'PTP'
      })

      let reVisitAppls = todoAppls.filter((appl) => {
        return ['NAH', 'LEM'].includes(appl.last_action_code)
      })

      state = {
        ...state,
        'todoCase': {
          'case': todoAppls.length,
          'applIds': todoAppls//.map(appl => appl.appl_id)
        },
        'todoFollowed': {
          'case': todoFollowedAppls.length,
          'applIds': todoFollowedAppls//.map(appl => appl.appl_id)
        },
        'todoPaid': {
          'case': todoPaidAppls.length,
          'applIds': todoPaidAppls//.map(appl => appl.appl_id)
        },
        'todoPtp': {
          'case': todoPtpAppls.length,
          'applIds': todoPtpAppls//.map(appl => appl.appl_id)
        },
        'todoBptp': {
          'case': 0,
          'applIds': []
        },
        'todoRevisit': {
          'case': reVisitAppls.length,
          'applIds': reVisitAppls//.map(appl => appl.appl_id)
        },
      }
      return state;

    // case constAction.SET_TODO_TASK:
    //   const list_task = [...action.content, ...state.list_task]
    //   return {
    //     ...state,
    //     list_task: list_task,
    //   }


    default:
      return state;

  }
};


export default todoReducers;