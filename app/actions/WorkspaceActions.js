import {
    CREATE_WORKSPACE,
    GET_WORKSPACE,
    RETRIEVE_WORKSPACES,
    EDIT_WORKSPACE,
    DELETE_WORKSPACE,
} from "./types/WorkspaceTypes";

import { CREATE_INVITE } from "./types/WorkspaceInviteTypes";

import { EDIT_USER } from "./types/UserTypes";

import getAPI from "../api/api";

//error handling
import * as Sentry from "@sentry/react";
import { errs, triggerAlert, triggerError } from "./ErrorActions";

export const createWorkspace = (formValues, passback) => async (dispatch) => {
    Sentry.setContext("WorkspaceActions::createWorkspace", {
        message: `Error creating workspace.`,
        ...formValues,
        passback,
    });

    const api = getAPI();

    let response;

    try {
        response = await api.post("/workspaces/create", formValues);
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: "/workspaces/create",
                body: formValues,
            },
        });
    }

    const {
        data: { success, error, alert, result },
    } = response;

    if (success == false) {
        triggerAlert(alert, dispatch);

        return Sentry.captureException(new Error(error), {
            tags: {
                message: errs[1],
                route: "/workspaces/create",
                body: formValues,
            },
        });
    } else {
        dispatch({ type: CREATE_WORKSPACE, payload: result });

        if (passback) return result;
    }
};

export const getWorkspace = ({ workspaceId }) => async (dispatch) => {
    Sentry.setContext("WorkspaceActions::getWorkspace", {
        message: `Error getting workspace.`,
        workspaceId,
    });

    const api = getAPI();

    if (!workspaceId) {
        triggerError(dispatch);

        return Sentry.captureException(
            new Error("Error: workspaceId was not provided.")
        );
    }

    let response;

    try {
        response = await api.get(`/workspaces/get/${workspaceId}`);
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: `/workspaces/get/${workspaceId}`,
                params: {
                    workspaceId,
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
                route: `/workspaces/get/${workspaceId}`,
                params: {
                    workspaceId,
                },
            },
        });
    } else {
        dispatch({ type: GET_WORKSPACE, payload: result });
    }
};

export const retrieveWorkspaces = ({ userId }) => async (dispatch) => {
    Sentry.setContext("WorkspaceActions::retrieveWorkspaces", {
        message: `Error retrieving workspaces.`,
        userId,
    });

    const api = getAPI();

    if (!userId) {
        triggerError(dispatch);

        return Sentry.captureException(
            new Error("Error: userId was not provided.")
        );
    }

    let response;

    try {
        response = await api.post(`/workspaces/retrieve`, {
            memberUserIds: [userId],
        });
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: "/workspaces/retrieve",
                body: {
                    memberUserIds: [userId],
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
                route: "/workspaces/retrieve",
                body: {
                    memberUserIds: [userId],
                },
            },
        });
    } else {
        dispatch({ type: RETRIEVE_WORKSPACES, payload: result });
    }
};

export const editWorkspace = (formValues) => async (dispatch) => {
    Sentry.setContext("WorkspaceActions::editWorkspace", {
        message: `Error editing workspace.`,
        ...formValues,
    });

    const api = getAPI();

    const { workspaceId } = formValues;

    if (!workspaceId) {
        triggerError(dispatch);

        return Sentry.captureException(
            new Error("Error: workspaceId was not provided.")
        );
    }

    let response;

    try {
        response = await api.put(`/workspaces/edit/${workspaceId}`, formValues);
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: `/workspaces/edit/${workspaceId}`,
                body: formValues,
                params: { workspaceId },
            },
        });
    }

    const { success, result, error, alert } = response.data;

    if (success == false) {
        if (alert) {
            triggerAlert(alert, dispatch);
        } else {
            triggerError(dispatch);
        }

        return Sentry.captureException(new Error(error), {
            tags: {
                message: errs[1],
                route: `/workspaces/edit/${workspaceId}`,
                body: formValues,
                params: { workspaceId },
            },
        });
    } else {
        dispatch({ type: EDIT_WORKSPACE, payload: result });
    }
};

export const deleteWorkspace = (formValues) => async (dispatch) => {
    Sentry.setContext("WorkspaceActions::deleteWorkspace", {
        message: `Error deleting workspace.`,
        ...formValues,
    });

    const api = getAPI();

    const { workspaceId } = formValues;

    if (!workspaceId) {
        triggerError(dispatch);

        return Sentry.captureException(
            new Error("Error: workspaceId was not provided.")
        );
    }

    let response;

    try {
        response = await api.delete(
            `/workspaces/delete/${workspaceId}`,
            formValues
        );
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: `/workspaces/delete/${workspaceId}`,
                body: formValues,
                params: { workspaceId },
            },
        });
    }

    const { success, result, error } = response.data;

    if (success == false) {
        triggerError(dispatch);

        return Sentry.captureException(new Error(error), {
            tags: {
                message: errs[1],
                route: `/workspaces/delete/${workspaceId}`,
                body: formValues,
                params: { workspaceId },
            },
        });
    } else {
        dispatch({ type: DELETE_WORKSPACE, payload: result });
    }
};

export const sendInvite = (formValues) => async (dispatch) => {
    Sentry.setContext("WorkspaceActions::sendInvite", {
        message: `Error sending invite.`,
        ...formValues,
    });

    const api = getAPI();

    const { workspaceId, email } = formValues;

    if (!workspaceId) {
        triggerError(dispatch);

        return Sentry.captureException(
            new Error("Error: workspaceId was not provided.")
        );
    }

    if (!email) {
        triggerError(dispatch);

        return Sentry.captureException(
            new Error("Error: email was not provided.")
        );
    }

    let response;

    try {
        response = await api.post(`/invites/${workspaceId}`, formValues);
    } catch (e) {
        triggerError(dispatch);

        return Sentry.captureException(e, {
            tags: {
                message: errs[0],
                route: `/invites/${workspaceId}`,
                body: formValues,
                params: { workspaceId },
            },
        });
    }

    const { success, result, error } = response.data;

    if (success == false) {
        triggerError(dispatch);

        return Sentry.captureException(new Error(error), {
            tags: {
                message: errs[1],
                route: `/invites/${workspaceId}`,
                body: formValues,
                params: { workspaceId },
            },
        });
    } else {
        if ("workspace" in result) {
            dispatch({ type: EDIT_WORKSPACE, payload: result["workspace"] });
        }

        if ("user" in result) {
            dispatch({ type: EDIT_USER, payload: result["user"] });
        }

        // need to retrieve invites on componentDidMount
        if ("invite" in result) {
            dispatch({ type: CREATE_INVITE, payload: result["invite"] });
        }
    }
};
