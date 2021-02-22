import * as constAction from "../consts/index";


const initialState = {
  fetching: false,
  moreFetching: false,
  error: null,
  userFetching: false,
  justFetching: false,
  dailyFetching: false,
  applidFetching: false,
  userError: null,
  uptrails: [],
  dailyUptrails: [],
  applidUptrails: {}
};

const uptrailReducers = (state = initialState, action) => {

  switch (action.type) {
    case constAction.UPTRAIL_CLEAR:
      return initialState

    case constAction.API_UPTRAIL_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_UPTRAIL_SUCCESS:
      state = {
        ...state,
        fetching: false,
        uptrails: action.content,
        error: null,
        justFetching: true,
        moreFetching: false
      }
      return state;

    case constAction.MORE_UPTRAIL_REQUEST:
      return { ...state, moreFetching: true, error: null };

    case constAction.MORE_UPTRAIL_SUCCESS:
      const uptrails = [...state.uptrails, ...action.content]
      state = {
        ...state,
        fetching: false,
        uptrails: uptrails,
        error: null,
        justFetching: true,
        moreFetching: false
      }
      return state;

    case constAction.DAILY_UPTRAIL_REQUEST:
      return { ...state, dailyFetching: true, error: null }

    case constAction.DAILY_UPTRAIL_SUCCESS:
      state = {
        ...state,
        dailyFetching: false,
        dailyUptrails: action.content.reverse()
      }
      return state;

    case constAction.APPLID_UPTRAIL_REQUEST:
      return { ...state, applidFetching: true, error: null }

    case constAction.APPLID_UPTRAIL_SUCCESS:
      const applidUptrails = { ...state.applidUptrails, ...action.content }
      state = {
        ...state,
        applidFetching: false,
        applidUptrails: applidUptrails
      }

      return state;


    case constAction.API_UPTRAIL_FAILURE:
      state = {
        ...state,
        fetching: false,
        dailyFetching: false,
        moreFetching: false,
        error: action.error
      }
      return state;

    case constAction.USER_UPTRAIL_REQUEST:
      return { ...state, userFetching: true, userError: null };

    case constAction.USER_UPTRAIL_SUCCESS:
      // const newUptrails = action.content.concat(state.uptrails);
      const newUptrails = [action.content, ...state.uptrails]


      state = {
        ...state,
        userFetching: false,
        uptrails: newUptrails,
        userError: null
      }

      if (state.applidUptrails[action.content.appl_id]) {
        const newApplidUptrails = [action.content, ...state.applidUptrails[action.content.appl_id]]
        state.applidUptrails[action.content.appl_id] = newApplidUptrails
      }
      return state;

    case constAction.USER_UPTRAIL_FAILURE:
      state = {
        ...state,
        userFetching: false,
        userError: action.error
      }
      return state;

    default:
      return state;
  }
};


export default uptrailReducers;