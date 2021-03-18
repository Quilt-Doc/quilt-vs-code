import { RETRIEVE_CONTEXTS } from "../actions/types/ContextTypes";

import _ from "lodash";

export default (state = {}, action) => {
    switch (action.type) {
        case RETRIEVE_CONTEXTS:
            return _.mapKeys(action.payload, "_id");

        default:
            return state;
    }
};
