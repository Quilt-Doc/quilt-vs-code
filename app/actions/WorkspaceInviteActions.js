// dispatch types
import { RETRIEVE_INVITES } from "./types/WorkspaceInviteTypes";

// utility functions
import _ from "lodash";

// api
import getAPI from "../api/api";

// error handling
import * as Sentry from "@sentry/react";
import { errs, triggerError } from "./ErrorActions";

export const retrieveWorkspaceInvites =
    ({ workspaceId }) =>
    async (dispatch) => {
        Sentry.setContext("WorkspaceInviteActions::retrieveWorkspaceInvites", {
            message: "Error retrieving workspace.",
            params: { workspaceId },
        });

        const api = getAPI();

        if (_.isNil(workspaceId)) {
            triggerError(dispatch);

            return Sentry.captureException(
                new Error("Error: workspaceId was not provided.")
            );
        }

        let response;

        try {
            response = await api.post(`/invites/${workspaceId}/retrieve`, {
                workspaceId,
            });
        } catch (e) {
            triggerError(dispatch);

            return Sentry.captureException(e, {
                tags: {
                    message: errs[0],
                    route: `/invites/${workspaceId}/retrieve`,
                    params: {
                        workspaceId,
                    },
                    body: {
                        workspaceId,
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
                    route: `/invites/${workspaceId}/retrieve`,
                    params: {
                        workspaceId,
                    },
                    body: {
                        workspaceId,
                    },
                },
            });
        } else {
            dispatch({
                type: RETRIEVE_INVITES,
                payload: result,
            });
        }
    };
