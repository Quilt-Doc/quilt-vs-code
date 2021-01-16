import {
    CREATE_WORKSPACE,
    GET_WORKSPACE,
    RETRIEVE_WORKSPACES,
} from "../actions/types/WorkspaceTypes";

import _ from "lodash";

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_WORKSPACE:
            return { ...state, [action.payload._id]: action.payload };

        case GET_WORKSPACE:
            return { ...state, [action.payload._id]: action.payload };

        case RETRIEVE_WORKSPACES:
            return _.mapKeys(action.payload, "_id");

        default:
            return state;
    }
};
