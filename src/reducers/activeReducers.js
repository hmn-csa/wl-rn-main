import * as constAction from "../consts/index";


// reducer with initial state
const initialState = {
  activeApplId: {
    appl_id: '',
    reg_address: '',
    cust_name: '',
    act_mobile: '',
  }
};

export function activeReducers(state = initialState, action) {
  switch (action.type) {

    case constAction.APPLID_VSF_ACTIVE:
      return { ...state, activeApplId: action.content, fetching: false, };

    default:
      return state;
  }
}

export default activeReducers;