import {
    CREATE_WORKSPACE,
    GET_WORKSPACE,
} from "../actions/types/WorkspaceTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_WORKSPACE:
            return { ...state, [action.payload._id]: action.payload };

        case GET_WORKSPACE:
            return { ...state, [action.payload._id]: action.payload };

        default:
            return state;
    }
};
