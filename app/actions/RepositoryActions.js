import _ from "lodash";

import { RETRIEVE_REPOSITORIES } from "./types/RepositoryTypes";

import getAPI from "../api/api";

//error handling
import * as Sentry from "@sentry/react";
import { errs, triggerError } from "./ErrorActions";

export const setRepositories =
    ({ repositories }) =>
    (dispatch) => {
        dispatch({
            type: RETRIEVE_REPOSITORIES,
            payload: repositories,
        });
    };

export const initRepository = (formValues) => async (dispatch) => {
    Sentry.setContext("RepositoryActions::initRepository", {
        message: "Error initializing repository.",
        ...formValues,
    });

    const api = getAPI();

    const { isPublic, publicHtmlUrl } = formValues;

    if (_.isNil(isPublic)) {
        triggerError(dispatch);

        return Sentry.captureException(
            new Error("Error: isPublic was not provided.")
        );
    }

    if (_.isNil(publicHtmlUrl)) {
        triggerError(dispatch);

        return Sentry.captureException(
            new Error("Error: publicHtmlUrl was not provided.")
        );
    }

    let response;

    try {
        response = await api.post("/repositories/init", formValues);
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: "/repositories/init",
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
                route: "/repositories/init",
                body: formValues,
            },
        });
    } else {
        return result;
    }
};
