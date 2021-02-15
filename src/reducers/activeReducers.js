import * as constAction from "../consts/index";


// reducer with initial state
const initialState = {
  fetching: false,
  error: null,
  vsfs: [],
  skips: [],
  activeIdno: {
    idno: null
  },

  activeApplId: {
    appl_id: '',
    reg_address: '',
    cust_name: '',
    act_mobile: '',
  }
};

export function activateReducers(state = initialState, action) {
  switch (action.type) {


    case constAction.APPLID_VSF_ACTIVE:
      const cur_active = state.vsfs.filter(
        item => item.appl_id === action.content.appl_id
      )[0]

      if (cur_active)
        return { ...state, activeApplId: cur_active, fetching: false, };
      else
        return { ...state, activeApplId: action.content, fetching: false, };

    case constAction.IDNO_SKIP_ACTIVE:

      return {
        ...state,
        activeIdno: action.content,
        fetching: false,
      };

    default:
      return state;
  }
}

export default activateReducers;