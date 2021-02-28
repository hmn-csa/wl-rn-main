import * as constAction from "../consts/index";


const initialState = {
    fetching: false,
    error: null,
    value: null
};

const rerenderapplReducers = (state = initialState, action) => {
    switch (action.type) {
        case constAction.RE_RENDER_APPL:
            return { ...state, fetching: false, error: null, value: action.content };

        default:
            return state;
    }
};
export default rerenderapplReducers;