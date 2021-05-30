import {
    CHECK_GITHUB_INSTALLATIONS,
    RETRIEVE_GITHUB_REPOSITORIES,
} from "./types/GithubTypes";

import getAPI from "../api/api";

// utility functions
import _ from "lodash";

//error handling
import * as Sentry from "@sentry/react";
import { errs, triggerError } from "./ErrorActions";

export const checkGithubInstallations = (formValues) => async (dispatch) => {
    Sentry.setContext("GithubActions::checkGithubInstallations", {
        message: "Error checking github installations.",
        ...formValues,
    });

    const api = getAPI();

    let response;

    try {
        response = await api.post("/auth/check_installation", formValues);
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: "/auth/check_installation",
                body: formValues,
            },
        });
    }

    const { success, error, result } = response.data;

    if (success == false) {
        triggerError(dispatch);

        return Sentry.captureException(new Error(error), {
            tags: {
                message: errs[1],
                route: "/auth/check_installation",
                body: formValues,
            },
        });
    } else {
        dispatch({
            type: CHECK_GITHUB_INSTALLATIONS,
            payload: result,
        });
    }
};

export const retrieveGithubRepositories = (formValues) => async (dispatch) => {
    Sentry.setContext("GithubActions::retrieveGithubRepositories", {
        message: "Error retrieving github installations.",
        ...formValues,
    });

    const api = getAPI();

    const { userId } = formValues;

    if (_.isNil(userId)) {
        Sentry.captureException(new Error("userId not provided."));
    }

    let response;

    try {
        response = await api.post(
            `/repositories/${userId}/retrieve_creation`,
            formValues
        );
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: `/repositories/${userId}/retrieve_creation`,
                params: {
                    userId,
                },
                body: formValues,
            },
        });
    }

    const { success, result, error } = response;

    if (success == false) {
        triggerError(dispatch);

        return Sentry.captureException(new Error(error), {
            tags: {
                message: errs[1],
                route: `/repositories/${userId}/retrieve_creation`,
                params: {
                    userId,
                },
                body: formValues,
            },
        });
    } else {
        dispatch({
            type: RETRIEVE_GITHUB_REPOSITORIES,
            payload: result,
        });
    }
};

export const searchPublicGithubRepositories = (formValues) => async (dispatch) => {
    Sentry.setContext("GithubActions::searchPublicGithubRepositories", {
        message: "Error searching public github repositories.",
        ...formValues,
    });

    const api = getAPI();

    const { query } = formValues;

    if (_.isNil(query)) {
        triggerError(dispatch);

        return Sentry.captureException(new Error("query not provided."));
    }

    let response;

    try {
        response = await api.post("/repositories/search_public_repos", formValues);
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: "/repositories/search_public_repos",
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
                route: "/repositories/search_public_repos",
                body: formValues,
            },
        });
    } else {
        return result;
    }
};
