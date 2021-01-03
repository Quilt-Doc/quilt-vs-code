import { CREATE_WORKSPACE, GET_WORKSPACE } from "./types/WorkspaceTypes";

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

export const getWorkspace = (workspaceId) => async (dispatch) => {
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
