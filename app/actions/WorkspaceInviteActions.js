import { RETRIEVE_INVITES } from "./types/WorkspaceInviteTypes";

import getAPI from "../api/api";

export const retrieveWorkspaceInvites = ({ workspaceId }) => async (
    dispatch
) => {
    const api = getAPI();

    console.log("RETRIEVING SPACE INVITES");

    if (!workspaceId) {
        throw new Error("retrieveWorkspaceInvites : workspaceId not provided");
    }

    const response = await api.post(`/invites/${workspaceId}/retrieve`, {
        workspaceId,
    });

    const { success, error, result } = response.data;

    console.log("INVITE RESULT", result);

    if (success == false) {
        throw new Error(error);
    } else {
        dispatch({
            type: RETRIEVE_INVITES,
            payload: result,
        });
    }
};
