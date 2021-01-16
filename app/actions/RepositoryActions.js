import { RETRIEVE_REPOSITORIES } from "./types/RepositoryTypes";

import getAPI from "../api/api";

//DEPRECATED
/*
export const retrieveRepositories = ({ workspaceId }) => async (dispatch) => {
    const api = getAPI();

    if (!workspaceId) {
        throw new Error("retrieveRepositories: workspaceId not provided");
    }

    const response = await api.post(`/repositories/${workspaceId}/retrieve`, {
        workspaceId,
    });

    const { success, error, result } = response.data;

    console.log("REPOSITORY RESULT", result);

    if (success == false) {
        throw new Error(error);
    } else {
        dispatch({
            type: RETRIEVE_REPOSITORIES,
            payload: result,
        });
    }
};*/

export const setRepositories = ({ repositories }) => (dispatch) => {
    dispatch({
        type: RETRIEVE_REPOSITORIES,
        payload: repositories,
    });
};
