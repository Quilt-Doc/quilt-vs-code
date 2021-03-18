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
    console.log("POSTING MESSAGE", payload);

    vscode.postMessage({
        type: SET_VALUE_GLOBAL_STORAGE,
        payload,
    });
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            console.log("Action Payload", action.payload);

            postMessage({
                key: "auth",
                value: action.payload,
            });

            return action.payload;

        case EDIT_USER:
            let { user } = state;

            user = { ...user, ...action.payload };

            const value = { ...state, user };

            postMessage({
                key: "auth",
                value,
            });

            return value;

        case LOGOUT_USER:
            postMessage({
                key: "auth",
                value: INITIAL_STATE,
            });

            return INITIAL_STATE;

        default:
            return state;
    }
};
