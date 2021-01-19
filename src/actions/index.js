import * as constAction from "../consts/index";



export const actUpdateShowlist = (content) => {
  //console.log(`actInitSHOWLIST`)
  return {
    type: constAction.UPDATE_SHOWLIST,
    content,
  }
};

export const actSetTodoShowlist = (content) => {
  //console.log(`actInitSHOWLIST`)
  return {
    type: constAction.SET_TODO_SHOWLIST,
    content,
  }
};


export const actloginUser = (config) => {
  return {
    type: constAction.API_TOKEN_REQUEST,
    config
  }
};

export const actLocationSet = (content) => {
  return {
    type: constAction.LOCATION_SET,
    content
  }
};

// ---------------- uptrail ---------------------//
export const actGetUptrails = (config) => {
  return {
    type: constAction.API_UPTRAIL_REQUEST,
    config
  }
};

export const actUserUptrails = (config) => {
  return {
    type: constAction.USER_UPTRAIL_REQUEST,
    config
  }
};

export const actSetActiveStaff = (content) => {
  return {
    type: constAction.SET_ACTIVE_STAFF,
    content
  }
};
// 


export const actlogoutUser = () => {
  return {
    type: constAction.TOKEN_REMOVE
  }
};

export const actGetDataSaga = (token) => {
  return {
    type: constAction.API_DATA_REQUEST,
    token
  }
};

export const actChangeTodoSaga = (config) => {
  return {
    type: constAction.API_TODO_REQUEST,
    config
  }
};

export const actGetVsfSaga = (config) => {
  return {
    type: constAction.API_VSF_REQUEST,
    config
  }
};

export const actSetActiveApplId = (content) => {
  return {
    type: constAction.APPLID_VSF_ACTIVE,
    content
  }
};


// summary actions
export const calTodoDash = (data) => {
  return {
    type: constAction.CAL_TODO_DASH,
    data
  }
};

export const calTreeDash = (data) => {
  return {
    type: constAction.CAL_TREE_DASH,
    data
  }
};

export const calTotalDash = (data) => {
  return {
    type: constAction.CAL_TOTAL_DASH,
    data
  }
};

export const calCateDash = (data) => {
  return {
    type: constAction.CAL_CATE_DASH,
    data
  }
};


//change status
export const actChangeToDo = (content) => {
  return {
    type: constAction.CHANGE_TODO,
    content,
  };
};

export const actChangeFollow = (content) => {
  return {
    type: constAction.CHANGE_FOLLOW,
    content,
  };
};

// =============== manager ================//
export const calManagerDash = (data) => {
  return {
    type: constAction.CAL_MANAGER_DASH,
    data
  }
};

export const setManagerDash = (data) => {
  return {
    type: constAction.SET_MANAGER_DASH,
    data
  }
};

export const apiStaffData = (config) => {
  return {
    type: constAction.MANAGER_DATA_REQUEST,
    config
  }
};

export const updateManagerDash = (data) => {
  return {
    type: constAction.UPDATE_MANAGER_DASH,
    data
  }
};


export const pullManagercount = () => {
  return {
    type: constAction.COUNT_MANAGER_PULL,
  }
};


export const managerClearState = () => {
  return {
    type: constAction.MANAGER_CLEAR_STATE,
  }
};

export const clearData = () => {
  return {
    type: constAction.DATA_CLEAR,
  }
};
export const clearShowlist = () => {
  return {
    type: constAction.SHOWLIST_CLEAR,
  }
};
export const clearUptrail = () => {
  return {
    type: constAction.UPTRAIL_CLEAR,
  }
};
// =============== map ================//

export const setMapStaff = (content) => {
  return {
    type: constAction.SET_MAP_STAFF,
    content
  }
};



// =============== clear ================//
