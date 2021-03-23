import { SET_CONTEXT_DISPLAY } from "../actions/types/ContextTypes";

import _ from "lodash";

export default (state = {}, action) => {
    switch (action.type) {
        case SET_CONTEXT_DISPLAY:
            return action.payload;

        default:
            return state;
    }
};
