import getAPI from "../api/api";

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
