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

export const createWorkspace = (formValues, passback) => async (dispatch) => {
    const api = getAPI();

    const response = await api.post("/workspaces/create", formValues);

    const {
        data: { success, error, alert, result },
    } = response;

    if (!success) {
        if (alert) {
            console.log(`User Message: ${alert}`);

            return false;
        } else {
            throw new Error(error);
        }
    } else {
        dispatch({ type: CREATE_WORKSPACE, payload: result });

        if (passback) return response.data.result;
    }
};

export const getWorkspace = ({ workspaceId }) => async (dispatch) => {
    const api = getAPI();

    if (!workspaceId) {
        throw new Error("getWorkspace: workspaceId not provided");
    }

    const response = await api.get(`/workspaces/get/${workspaceId}`);

    if (response.data.success == false) {
        throw new Error(response.data.error.toString());
    } else {
        dispatch({ type: GET_WORKSPACE, payload: response.data.result });
    }
};

export const retrieveWorkspaces = ({ userId }) => async (dispatch) => {
    const api = getAPI();

    if (!userId) {
        throw new Error("retrieveWorkspaces: workspaceId not provided");
    }

    const response = await api.post(`/workspaces/retrieve`, {
        memberUserIds: [userId],
    });

    const { success, result, trace } = response.data;

    if (!success) {
        throw new Error(trace);
    } else {
        dispatch({ type: RETRIEVE_WORKSPACES, payload: result });
    }
};

export const editWorkspace = (formValues) => async (dispatch) => {
    const api = getAPI();

    const { workspaceId } = formValues;

    if (!workspaceId) {
        throw new Error("editWorkspaces: workspaceId not provided");
    }

    const response = await api.put(
        `/workspaces/edit/${workspaceId}`,
        formValues
    );

    const { success, result, message, trace } = response.data;

    if (!success) {
        if (trace) {
            throw new Error(trace);
        } else if (message) {
            console.log("NEED TO ALERT", message);
        }
    } else {
        dispatch({ type: EDIT_WORKSPACE, payload: result });
    }
};

export const deleteWorkspace = (formValues) => async (dispatch) => {
    const api = getAPI();

    const { workspaceId } = formValues;

    if (!workspaceId) {
        throw new Error("deleteWorkspaces: workspaceId not provided");
    }

    const response = await api.delete(
        `/workspaces/delete/${workspaceId}`,
        formValues
    );

    const { success, result, error } = response.data;

    if (!success) {
        throw new Error(error);
    } else {
        dispatch({ type: DELETE_WORKSPACE, payload: result });
    }
};

export const sendInvite = (formValues) => async (dispatch) => {
    const api = getAPI();

    const { workspaceId, email } = formValues;

    if (!workspaceId) {
        throw new Error("sendInvite: workspaceId not provided");
    }

    if (!email) {
        throw new Error("sendInvite: email not provided");
    }

    const response = await api.post(`/invites/${workspaceId}`, formValues);

    const { success, result, error } = response.data;

    if (success === false) {
        throw new Error(error);
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
