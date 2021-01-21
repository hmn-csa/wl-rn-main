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

export function vsfReducers(state = initialState, action) {
  switch (action.type) {

    // VSF
    case constAction.API_VSF_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_VSF_SUCCESS:
      state.vsfs.push(action.content[0])
      return { ...state, fetching: false, activeApplId: action.content[0] };

    case constAction.API_VSF_FAILURE:
      return { ...state, fetching: false, error: true };

    // skip
    case constAction.API_SKIP_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_SKIP_SUCCESS:
      state.skips.push(action.content)
      return { ...state, fetching: false};

    case constAction.API_SKIP_FAILURE:
      return { ...state, 
        fetching: false,  
        error: true, 
        activeIdno: {id_no: null}
      };

    case constAction.APPLID_VSF_ACTIVE:
      const cur_active = state.vsfs.filter(
        item => item.appl_id === action.content.appl_id
      )[0]
      if (cur_active)
        return { ...state, activeApplId: cur_active };
      else
        return { ...state, activeApplId: action.content };
    
    case constAction.IDNO_SKIP_ACTIVE:
      // if (action.content.main_ref) {
      //   const mainRef = []
      //   for (let i=0; i< action.content.main_ref.length; i++ )
      //     mainRef.push({
      //       id: action.content.main_ref[i].ref_phone, 
      //       name: action.content.main_ref[i].ref_name, 
      //       ref_nid_no: action.content.main_ref[i].ref_nid_no, 
      //     })

      //   const fatherRef = []
      //   for (let i=0; i< action.content.father_ref.length; i++ )
      //     fatherRef.push({
      //       id: action.content.main_ref[i].ref_phone,
      //       name: action.content.father_ref[i].ref_name, 
      //       ref_nid_no: action.content.father_ref[i].ref_nid_no, 
      //     })
          
      //   let phoneBook = [
      //     {
      //       id: 'mainRef',
      //       name: 'mainRef',
      //       children: mainRef
      //     }, 
      //     {
      //       id: 'fatherRef',
      //       name: 'fatherRef',
      //       // children: fatherRef,
      //     }, 
      //   ]
      //   return { ...state, 
      //     activeIdno: action.content,
      //     phoneBook: phoneBook
      //   };
      // }
      
      return { ...state, 
        activeIdno: action.content,
      };

    default:
      return state;
  }
}

export default vsfReducers;