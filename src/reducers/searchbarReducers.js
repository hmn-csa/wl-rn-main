import * as constAction from "../consts/index";


const initialState = {
    fetching: false,
    error: null,
    value: null
};

const searchbarReducers = (state = initialState, action) => {
    switch (action.type) {
        case constAction.SEND_VALUE_SEARCH:
            return { ...state, fetching: false, error: null, value: action.content };

        default:
            return state;
    }
};
export default searchbarReducers;