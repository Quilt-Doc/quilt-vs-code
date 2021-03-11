import getAPI from "../api/api";

export const getExternalGoogleDrives = (formValues) => async () => {
    const api = getAPI();

    const { workspaceId, userId } = formValues;

    if (!workspaceId) throw new Error("No workspaceId provided");

    if (!userId) throw new Error("No userId provided");

    console.log(
        "ROUTE",
        `/integrations/${workspaceId}/${userId}/google/get_external_drives`
    );

    const response = await api.get(
        `/integrations/${workspaceId}/${userId}/google/get_external_drives`
    );

    const { error, success, result } = response.data;

    console.log("RESULT IN ACTION", result);

    if (!success) throw new Error(error);

    return result;
};
