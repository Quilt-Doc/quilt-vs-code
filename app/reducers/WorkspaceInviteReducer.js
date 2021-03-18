import {
    CREATE_INVITE,
    RETRIEVE_INVITES,
} from "../actions/types/WorkspaceInviteTypes";

import _ from "lodash";

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_INVITE:
            return { ...state, [action.payload._id]: action.payload };

        case RETRIEVE_INVITES:
            return _.mapKeys(action.payload, "_id");

        default:
            return state;
    }
};
