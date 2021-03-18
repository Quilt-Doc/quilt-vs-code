import { RETRIEVE_CONTEXTS } from "./types/ContextTypes";

import getAPI from "../api/api";

export const retrieveContexts = ({ workspaceId }) => async (dispatch) => {
    const api = getAPI();

    if (!workspaceId)
        throw new Error("retrieveContexts: workspaceId not provided");

    const response = await api.post(`/contexts/${workspaceId}/retrieve`);

    const { success, result, error } = response.data;

    console.log("CONTEXTS ARE RETIREVED", response);

    if (!success) {
        throw new Error(error);
    } else {
        dispatch({ type: RETRIEVE_CONTEXTS, payload: result });
    }
};
