// dispatch types
import { EDIT_USER } from "./types/UserTypes";

// utility functions
import _ from "lodash";

// api
import getAPI from "../api/api";

// error handling
import * as Sentry from "@sentry/react";
import { errs, triggerError } from "./ErrorActions";

export const editUser = (formValues) => async (dispatch) => {
    Sentry.setContext("UserActions::editUser", {
        message: "Error editing user.",
        ...formValues,
    });

    const { userId } = formValues;

    const api = getAPI();

    if (_.isNil(userId)) {
        triggerError(dispatch);

        return Sentry.captureException(new Error("Error: userId not provided."));
    }

    let response;

    try {
        response = await api.put(`/users/edit/${userId}`, formValues);
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: `/users/edit/${userId}`,
                params: {
                    userId,
                },
                body: formValues,
            },
        });
    }

    const { success, result, error } = response.data;

    if (success == false) {
        triggerError(dispatch);

        return Sentry.captureException(new Error(error), {
            tags: {
                message: errs[1],
                route: `/users/edit/${userId}`,
                params: {
                    userId,
                },
                body: formValues,
            },
        });
    } else {
        dispatch({ type: EDIT_USER, payload: result });
    }
};
