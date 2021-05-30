// api
import axios from "axios";

// constants
import { BASE_URL } from "../constants";

// utility functions
import _ from "lodash";

// error handling
import * as Sentry from "@sentry/react";
import { errs, triggerError } from "./ErrorActions";

export const storeExtensionMessage = (extensionMessagePayload) => (dispatch) => {
    const { dispatchType: type, value: payload } = extensionMessagePayload;

    dispatch({
        type,
        payload,
    });
};

export const extensionAuthenticateUser = (payload) => async (dispatch) => {
    Sentry.setContext("ExtensionActions::extensionAuthenticateUser", {
        message: "Error authenticating user.",
        ...payload,
    });

    const { value: formValues, dispatchType: type } = payload;

    const { userId, isAuthorized, jwt } = formValues;

    if (_.isNil(userId)) {
        triggerError(dispatch);

        return Sentry.captureException(new Error("Error: userId was not provided."));
    }

    if (_.isNil(isAuthorized)) {
        triggerError(dispatch);

        return Sentry.captureException(
            new Error("Error: isAuthorized was not provided.")
        );
    }

    if (_.isNil(jwt)) {
        triggerError(dispatch);

        return Sentry.captureException(new Error("Error: jwt was not provided."));
    }

    let response;

    try {
        response = await axios.get(`${BASE_URL}/users/get/${userId}`, {
            headers: {
                authorization: `Bearer ${jwt}`,
            },
        });
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: `/users/get/${userId}`,
                params: {
                    userId,
                },
            },
        });
    }

    const { success, result, error } = response.data;

    if (success == false) {
        triggerError(dispatch);

        return Sentry.captureException(new Error(error), {
            tags: {
                message: errs[1],
                route: `/users/get/${userId}`,
                params: {
                    userId,
                },
            },
        });
    } else {
        dispatch({
            type,
            payload: {
                isAuthorized,
                jwt,
                user: result,
            },
        });
    }
};
