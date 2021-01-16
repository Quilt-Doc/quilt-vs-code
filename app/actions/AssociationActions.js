import { UPDATE_GITHUB_FILE_CONTEXT } from "./types/GithubTypes";
import { UPDATE_TRELLO_FILE_CONTEXT } from "./types/TrelloTypes";

import getAPI from "../api/api";

const types = {
    github: UPDATE_GITHUB_FILE_CONTEXT,
    trello: UPDATE_TRELLO_FILE_CONTEXT,
};

export const generateAssociations = ({ workspaceId, contexts }) => async (
    dispatch
) => {
    const api = getAPI();

    if (!workspaceId) throw new Error("No workspaceId provided");

    if (!contexts) throw new Error("No contexts are specified");

    const response = await api.post(
        `/associations/${workspaceId}/generate_associations`,
        { contexts }
    );

    const { success, result, error } = response.data;

    if (success) {
        return result;
    } else {
        console.log("ERROR", error);
    }
};

export const getFileContext = ({
    workspaceId,
    repositoryId,
    filePath,
}) => async (dispatch) => {
    const api = getAPI();

    if (!workspaceId) throw new Error("No workspaceId provided");

    if (!filePath) throw new Error("No filePath is specified");

    console.log("PARAMS", {
        workspaceId,
        repositoryId,
        filePath,
    });

    console.log(
        "PATH",
        `/associations/${workspaceId}/${repositoryId}/get_file_context`
    );

    const response = await api.post(
        `/associations/${workspaceId}/${repositoryId}/get_file_context`,
        { filePath }
    );

    const { result, success, error } = response.data;

    console.log("FINAL", { result, success, error });

    if (!success) {
        throw new Error(error);
    } else {
        console.log("RESULT", result);

        Object.keys(result).map((integration) => {
            console.log("DISPATCH", {
                type: types[integration],
                payload: result[integration],
            });

            dispatch({
                type: types[integration],
                payload: result[integration],
            });
        });
    }
};
