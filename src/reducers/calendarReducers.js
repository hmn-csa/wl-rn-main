import * as constAction from "../consts/index";


const initialState = {
  fetching: false,
  error: null,
  calendar: {},
};


const calendarReducers = (state = initialState, action) => {

  switch (action.type) {

    case constAction.API_CALENDAR_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_CALENDAR_SUCCESS:
      // var today = new Date()
      // var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
      // var datasets = []
      // var dateObj, dateStr
      // for (let i = 1; i < lastDayOfMonth +1; i++) {
      //   dateObj = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      //   dateStr  = dateObj.getFullYear() + 
      //     '-' + String(dateObj.getMonth() + 1).padStart(2, '0')
      //     '-' + String(dateObj.getDate()).padStart(2, '0');

      // }

      return {
        ...state,
        fetching: false,
        calendar: action.content,
        error: null,
      }

    case constAction.USER_CALENDAR_REMOVE:
      const newList = state.calendar[action.content.scheduled_date.substring(0, 10)].filter(item =>
        item.appl_id != action.content.appl_id && item.appl_id.scheduled_date != action.content.scheduled_date
      )
      state.calendar[action.content.scheduled_date.substring(0, 10)] = newList
      return state

    case constAction.USER_CALENDAR_UPDATE:
      const updateCase = state.calendar[action.content.scheduled_date.substring(0, 10)]
      const curIndex = updateCase.findIndex(item =>
        item.appl_id === action.content.appl_id
      )
      if (curIndex === -1)
        return state

      updateCase[curIndex] = {
        ...updateCase[curIndex],
        task_done: action.content.task_done,
        scheduled_amt: action.content.scheduled_amt,
        remark: action.content.remark,
      }
      // not change date
      if (action.content.scheduled_date_change.substring(0, 10) === action.content.scheduled_date.substring(0, 10))
        state.calendar[action.content.scheduled_date.substring(0, 10)] = updateCase
      else {
        const updateItem = updateCase[curIndex]
        updateCase.splice(curIndex, 1)
        state.calendar[action.content.scheduled_date_change.substring(0, 10)].push(
          {
            ...updateItem,
            scheduled_date: action.content.scheduled_date_change
          }
        )
      }

      return state



    case constAction.USER_CALENDAR_APPEND:
      state.calendar[action.content.scheduled_date.substring(0, 10)].push(
        action.content
      )
      return state;

    case constAction.API_CALENDAR_FAILURE:
      state = { ...state, fetching: false, error: action.error }
      return state;

    default:
      return state;
  }
};


export default calendarReducers;