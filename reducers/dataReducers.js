import * as constAction from "../consts/index";

const initialState = {
  fetching: false,
  data: null,
  error: null
};

const applsReducers = (state = initialState, action) => {

  switch(action.type) {
    case constAction.API_DATA_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_DATA_SUCCESS:
      return { ...state, fetching: false, data: action.content };

    case constAction.API_DATA_FAILURE:
      return { ...state, fetching: false, data: action.content, error: action.error };

    default:
      return state;
  }
};


export default applsReducers;