import * as constAction from "../consts/index";


// reducer with initial state
const initialState = {
  fetching: false,
  error: null,
  vsfs: [],
  activeApplId: {
    appl_id: '',
    reg_address: '',
    cust_name: '',
    act_mobile: '',
  }
};

export function vsfReducers(state = initialState, action) {
  switch (action.type) {

    //case "API_TOKEN_CONFIG":
    //  return { ...state, config: action.config};

    case constAction.API_VSF_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_VSF_SUCCESS:
      state.vsfs.push(action.content[0])
      //console.log(action.content[0])
      return { ...state, fetching: false, activeApplId: action.content[0] };

    case constAction.API_VSF_FAILURE:
      return { ...state, fetching: false, vsfs: action.content, error: action.error };

    case constAction.APPLID_VSF_ACTIVE:
      const cur_active = state.vsfs.filter(item => item.appl_id === action.content.appl_id)[0]
      if (cur_active)
        return { ...state, activeApplId: cur_active };
      else
        return { ...state, activeApplId: action.content };


    default:
      return state;
  }
}

export default vsfReducers;