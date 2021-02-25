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

    case constAction.API_CALENDAR_FAILURE:
      state = { ...state, fetching: false, error: action.error }
      return state;

    default:
      return state;
  }
};


export default calendarReducers;