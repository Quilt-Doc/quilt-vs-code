import getAPI from "../api/api";
import { setError } from "./ErrorActions";

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
        dispatch({
            type: SET_CONTEXT_DISPLAY,
            payload: result,
        });
        Object.keys(result).map((integration) => {
            dispatch({
                type: types[integration],
                payload: result[integration],
            });
        });
    }
};
