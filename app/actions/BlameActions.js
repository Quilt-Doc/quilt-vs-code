import { RETRIEVE_BLAMES } from "./types/BlameTypes";

import getAPI from "../api/api";

export const retrieveBlames = (formValues) => async (dispatch) => {
    const api = getAPI();

    const { filePath, fileContent, workspaceId, repositoryId } = formValues;

    const response = await api.post(
        `/contexts/${workspaceId}/${repositoryId}/get_blames`,
        {
            filePath,
            fileContent,
        }
    );

    const { success, error, result } = response;

    if (!success) {
        throw new Error(error);
    } else {
        dispatch({
            type: RETRIEVE_BLAMES,
            payload: result,
        });
    }
};
