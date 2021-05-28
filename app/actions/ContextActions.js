// dispatch types
import { SET_CONTEXT_DISPLAY } from "./types/ContextTypes";

// utility
import _ from "lodash";

// api
import getAPI from "../api/api";

//error handling
import * as Sentry from "@sentry/react";
import { errs, triggerError } from "./ErrorActions";

export const getFileContext =
    ({ workspaceId, repositoryId, filePath }) =>
    async (dispatch) => {
        Sentry.setContext("ContextActions::getFileContext", {
            message: "Error getting file context.",
            workspaceId,
            repositoryId,
            filePath,
        });

        const api = getAPI();

        if (_.isNil(workspaceId)) {
            triggerError(dispatch);

            return Sentry.captureException(
                new Error("Error: workspaceId was not provided.")
            );
        }

        if (_.isNil(filePath)) {
            triggerError(dispatch);

            return Sentry.captureException(
                new Error("Error: workspaceId was not provided.")
            );
        }

        let response;

        try {
            response = await api.post(
                `/associations/${workspaceId}/${repositoryId}/get_file_context`,
                { filePath }
            );
        } catch (e) {
            triggerError(dispatch);

            return Sentry.captureException(e, {
                tags: {
                    message: errs[0],
                    route: `/associations/${workspaceId}/${repositoryId}/get_file_context`,
                    params: {
                        workspaceId,
                        repositoryId,
                    },
                    body: {
                        filePath,
                    },
                },
            });
        }

        const { result, success, error } = response.data;

        if (success == false) {
            triggerError(dispatch);

            return Sentry.captureException(new Error(error), {
                tags: {
                    message: errs[1],
                    route: `/associations/${workspaceId}/${repositoryId}/get_file_context`,
                    params: {
                        workspaceId,
                        repositoryId,
                    },
                    body: {
                        filePath,
                    },
                },
            });
        } else {
            dispatch({
                type: SET_CONTEXT_DISPLAY,
                payload: result,
            });
        }
    };
