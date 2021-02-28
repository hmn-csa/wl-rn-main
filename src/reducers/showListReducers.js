import * as constAction from "../consts/index";

const showListReducers = (
  state = { applIds: [], applids: [{ 'appl_id': null }], isTodoClass: true }, action) => {

  switch (action.type) {
    case constAction.SHOWLIST_CLEAR:
      state = { applIds: [], isTodoClass: true }
      return state;

    case constAction.UPDATE_SHOWLIST:
      state = { ...state, applIds: action.content, }
      return state;

    case constAction.SET_TODO_SHOWLIST:
      state = { ...state, isTodoClass: action.content }
      return state;

    case constAction.CHANGE_FOLLOW_SHOWLIST:
      Index = state.applIds.findIndex(
        (obj) => obj.appl_id == action.content.appl_id
      );
      state.applIds[Index] = {
        ...state.applIds[Index],
        last_action_code: action.content.code,
      };
      return state;

    default:
      return state;
  }
};


export default showListReducers;