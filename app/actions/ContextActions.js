import { SET_CONTEXT_DISPLAY } from "./types/ContextTypes";

import getAPI from "../api/api";

export const getFileContext =
    ({ workspaceId, repositoryId, filePath }) =>
    async (dispatch) => {
        const api = getAPI();

        if (!workspaceId) throw new Error("No workspaceId provided");

        if (!filePath) throw new Error("No filePath is specified");

        const response = await api.post(
            `/associations/${workspaceId}/${repositoryId}/get_file_context`,
            { filePath }
        );

        console.log("Response of call", response);

        const { result, success, error } = response.data;

        if (!success) {
            throw new Error(error);
        } else {
            console.log("Result of context call", result);
            dispatch({
                type: SET_CONTEXT_DISPLAY,
                payload: result,
            });
        }
    };
