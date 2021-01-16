import { UPDATE_TRELLO_FILE_CONTEXT } from "../actions/types/TrelloTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TRELLO_FILE_CONTEXT:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
