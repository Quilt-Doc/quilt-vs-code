import getAPI from "../api/api";

// utility functions
import _ from "lodash";

// error handling
import * as Sentry from "@sentry/react";
import { errs, triggerError } from "./ErrorActions";

export const generateAssociations =
    ({ workspaceId, contexts }) =>
    async (dispatch) => {
        Sentry.setContext("AssociationActions::generateAssociations", {
            message: "Error generating associations.",
            workspaceId,
            contexts,
        });

        const api = getAPI();

        if (_.isNil(workspaceId)) {
            triggerError(dispatch);

            return Sentry.captureException(
                new Error("Error: workspaceId was not provided.")
            );
        }

        if (_.isNil(contexts)) {
            triggerError(dispatch);

            return Sentry.captureException(
                new Error("Error: contexts was not provided.")
            );
        }

        let response;

        try {
            response = await api.post(
                `/associations/${workspaceId}/generate_associations`,
                { contexts }
            );
        } catch (e) {
            triggerError(dispatch);

            return Sentry.captureException(e, {
                tags: {
                    message: errs[0],
                    route: `/associations/${workspaceId}/generate_associations`,
                    params: {
                        workspaceId,
                    },
                    body: {
                        contexts,
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
                    route: `/associations/${workspaceId}/generate_associations`,
                    params: {
                        workspaceId,
                    },
                    body: {
                        contexts,
                    },
                },
            });
        } else {
            return result;
        }
    };
