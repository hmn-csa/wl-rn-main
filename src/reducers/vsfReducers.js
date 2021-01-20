import * as constAction from "../consts/index";


// reducer with initial state
const initialState = {
  fetching: false,
  error: null,
  vsfs: [],
  skips: [],
  activeIdno: {
    idno: ''
  },
  activeApplId: {
    appl_id: '',
    reg_address: '',
    cust_name: '',
    act_mobile: '',
  }
};

export function vsfReducers(state = initialState, action) {
  switch (action.type) {

    // VSF
    case constAction.API_VSF_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_VSF_SUCCESS:
      state.vsfs.push(action.content[0])
      return { ...state, fetching: false, activeApplId: action.content[0] };

    case constAction.API_VSF_FAILURE:
      return { ...state, fetching: false, error: action.error };

    // skip
    case constAction.API_SKIP_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_SKIP_SUCCESS:
      state.skips.push(action.content)
      return { ...state, fetching: false};

    case constAction.API_SKIP_FAILURE:
      return { ...state, fetching: false,  error: action.error };

    case constAction.APPLID_VSF_ACTIVE:
      const cur_active = state.vsfs.filter(
        item => item.appl_id === action.content.appl_id
      )[0]
      if (cur_active)
        return { ...state, activeApplId: cur_active };
      else
        return { ...state, activeApplId: action.content };
    
    case constAction.IDNO_SKIP_ACTIVE:
      const idno_active = state.skips.filter(
        item => item.id_no === action.content.idno
      )[0]
      if (idno_active)
        return { ...state, activeIdno: idno_active };
      else
        return { ...state, activeIdno: action.content};

    default:
      return state;
  }
}

export default vsfReducers;