import {
    CREATE_WORKSPACE,
    GET_WORKSPACE,
    RETRIEVE_WORKSPACES,
    EDIT_WORKSPACE,
} from "../actions/types/WorkspaceTypes";

import _ from "lodash";

import { merge } from "./helpers";

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_WORKSPACE:
            return { ...state, [action.payload._id]: action.payload };

        case GET_WORKSPACE:
            return { ...state, [action.payload._id]: action.payload };

        case RETRIEVE_WORKSPACES:
            return _.mapKeys(action.payload, "_id");

        case EDIT_WORKSPACE:
            const newestState = merge(state, [action.payload]);

            console.log("NEWEST REDUX", newestState);

            return merge(state, [action.payload]);

        default:
            return state;
    }
};
