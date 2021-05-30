import { RETRIEVE_BLAMES } from "./types/BlameTypes";

// api
import getAPI from "../api/api";

// utility functions
import _ from "lodash";

// error handling
import * as Sentry from "@sentry/react";
import { errs, triggerError } from "./ErrorActions";

export const retrieveBlames = (formValues) => async (dispatch) => {
    Sentry.setContext("BlameActions::retrieveBlames", {
        message: "Error retrieving blames.",
        ...formValues,
    });

    const api = getAPI();

    const { filePath, fileContent, repositoryId, workspaceId } = formValues;

    if (_.isNil(filePath)) {
        triggerError(dispatch);

        return Sentry.captureException(
            new Error("Error: filePath was not provided.")
        );
    }

    if (_.isNil(fileContent)) {
        triggerError(dispatch);

        return Sentry.captureException(
            new Error("Error: fileContent was not provided.")
        );
    }

    if (_.isNil(repositoryId)) {
        triggerError(dispatch);

        return Sentry.captureException(
            new Error("Error: repositoryId was not provided.")
        );
    }

    if (_.isNil(workspaceId)) {
        triggerError(dispatch);

        return Sentry.captureException(
            new Error("Error: workspaceId was not provided.")
        );
    }

    let response;

    try {
        response = await api.post(
            `/blames/${workspaceId}/${repositoryId}/retrieve`,
            {
                filePath,
                fileText: fileContent,
            }
        );
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: `/blames/${workspaceId}/${repositoryId}/retrieve`,
                params: {
                    workspaceId,
                    repositoryId,
                },
                body: {
                    filePath,
                    fileText: fileContent,
                },
            },
        });
    }

    const { success, error, result } = response.data;

    if (success == false) {
        triggerError(dispatch);

        return Sentry.captureException(new Error(error), {
            tags: {
                message: errs[1],
                route: `/blames/${workspaceId}/${repositoryId}/retrieve`,
                params: {
                    workspaceId,
                    repositoryId,
                },
                body: {
                    filePath,
                    fileText: fileContent,
                },
            },
        });
    } else {
        dispatch({
            type: RETRIEVE_BLAMES,
            payload: result,
        });
    }
};
