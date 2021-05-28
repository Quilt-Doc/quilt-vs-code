import { AUTHENTICATE_USER, LOGOUT_USER } from "./types/AuthTypes";

import getAPI from "../api/api";

//error handling
import * as Sentry from "@sentry/react";
import { errs, triggerError } from "./ErrorActions";

export const authenticateUser = (payload) => (dispatch) => {
    dispatch({
        type: AUTHENTICATE_USER,
        payload,
    });
};

export const logoutUser = () => (dispatch) => {
    dispatch({
        type: LOGOUT_USER,
    });
};

export const encryptAuthToken = () => async (dispatch) => {
    Sentry.setContext("AuthActions::encryptAuthToken", {
        message: "Error encrypting auth token.",
    });

    const api = getAPI();

    let response;

    try {
        response = await api.get("/auth/encrypt_ide_token");
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: "/auth/encrypt_ide_token",
            },
        });
    }

    const { result, success, error } = response.data;

    if (success == false) {
        triggerError(dispatch);

        return Sentry.captureException(new Error(error), {
            tags: {
                message: errs[1],
                route: "/auth/encrypt_ide_token",
            },
        });
    } else {
        return result;
    }
};
