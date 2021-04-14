import { RETRIEVE_BLAMES } from "./types/BlameTypes";

import getAPI from "../api/api";

export const retrieveBlames = (formValues) => async (dispatch) => {
    const api = getAPI();

    const { filePath, fileContent, repositoryId, workspaceId } = formValues;

    const response = await api.post(
        `/blames/${workspaceId}/${repositoryId}/retrieve`,
        {
            filePath,
            fileText: fileContent,
        }
    );

    const { success, error, result } = response.data;

    console.log("RESULT", result);

    if (!success) {
        throw new Error(error);
    } else {
        dispatch({
            type: RETRIEVE_BLAMES,
            payload: result,
        });
    }
};
