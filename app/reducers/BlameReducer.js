import { RETRIEVE_BLAMES } from "../actions/types/BlameTypes";

import _ from "lodash";

const INITIAL_STATE = {
    blameChunks: {},
    contextBlames: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RETRIEVE_BLAMES:
            let { blameChunks, contextBlames } = action.payload;

            blameChunks = _.mapKeys(blameChunks, "start");

            return { blameChunks, ...state };

        default:
            return state;
    }
};
