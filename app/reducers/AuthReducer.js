import { AUTHENTICATE_USER, LOGOUT_USER } from "../actions/types/AuthTypes";
import { EDIT_USER } from "../actions/types/UserTypes";
import { SET_VALUE_GLOBAL_STORAGE } from "../vscode/types/messageTypes";

import vscode from "../vscode/vscode";

const INITIAL_STATE = {
    jwt: null,
    user: {},
    isAuthorized: false,
};

const postMessage = (payload) => {
    vscode.postMessage({
        type: SET_VALUE_GLOBAL_STORAGE,
        payload,
    });
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            postMessage({
                key: "auth",
                value: {
                    jwt: action.payload.jwt,
                    isAuthorized: action.payload.isAuthorized,
                    userId: action.payload.user._id,
                },
            });

            return action.payload;

        case EDIT_USER:
            let { user } = state;

            user = { ...user, ...action.payload };

            const value = { ...state, user };

            return value;

        case LOGOUT_USER:
            postMessage({
                key: "auth",
                value: {
                    jwt: null,
                    isAuthorized: false,
                    userId: null,
                },
            });

            return INITIAL_STATE;

        default:
            return state;
    }
};
