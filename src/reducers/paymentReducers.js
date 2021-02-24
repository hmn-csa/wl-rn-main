import * as constAction from "../consts/index";


const initialState = {
  fetching: false,
  error: null,
  payments: []
};

const paymentReducers = (state = initialState, action) => {

  switch (action.type) {

    case constAction.API_PAYMENT_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_PAYMENT_SUCCESS:
      state = {
        ...state,
        fetching: false, payments: action.content, error: null
      }
      return state;

    case constAction.API_PAYMENT_FAILURE:
      state = { ...state, fetching: false, error: action.error }
      return state;


    default:
      return state;
  }
};


export default paymentReducers;