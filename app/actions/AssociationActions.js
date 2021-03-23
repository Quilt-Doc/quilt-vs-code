import { POPULATE_GITHUB_CONTEXT } from "./types/GithubTypes";
import { POPULATE_TRELLO_CONTEXT } from "./types/TrelloTypes";
import { POPULATE_JIRA_CONTEXT } from "./types/JiraTypes";

import getAPI from "../api/api";
import { setError } from "./ErrorActions";

const types = {
    github: POPULATE_GITHUB_CONTEXT,
    trello: POPULATE_TRELLO_CONTEXT,
    jira: POPULATE_JIRA_CONTEXT,
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

    const response = await api.post(
        `/associations/${workspaceId}/${repositoryId}/get_file_context`,
        { filePath }
    );

    const { result, success, error } = response.data;

    if (!success) {
        throw new Error(error);
    } else {
        Object.keys(result).map((integration) => {
            dispatch({
                type: types[integration],
                payload: result[integration],
            });
        });
    }
};
