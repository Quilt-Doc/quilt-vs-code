import { RETRIEVE_REPOSITORIES } from "../actions/types/RepositoryTypes";

import _ from "lodash";

//ITEMS ARE CURRENTLY NOT POPULATED
export default (state = {}, action) => {
    switch (action.type) {
        case RETRIEVE_REPOSITORIES:
            return _.mapKeys(action.payload, "_id");

        default:
            return state;
    }
};
