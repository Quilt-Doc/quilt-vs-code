import { AUTHENTICATE_USER } from "../actions/types/AuthTypes";
import { EDIT_USER } from "../actions/types/UserTypes";

const INITIAL_STATE = {
    jwt: null,
    user: {},
    isAuthorized: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return action.payload;

        case EDIT_USER:
            return { ...state, user: action.payload };

        default:
            return state;
    }
};
