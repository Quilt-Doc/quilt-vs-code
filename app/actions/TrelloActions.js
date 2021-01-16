import getAPI from "../api/api";

export const getExternalTrelloBoards = (formValues) => async () => {
    const api = getAPI();

    const { workspaceId, userId } = formValues;

    if (!workspaceId) throw new Error("No workspaceId provided");

    if (!userId) throw new Error("No userId provided");

    console.log(
        "ROUTE",
        `/integrations/${workspaceId}/${userId}/trello/get_external_boards`
    );

    console.log("FORMVALS", formValues);

    const response = await api.get(
        `/integrations/${workspaceId}/${userId}/trello/get_external_boards`,
        formValues
    );

    const { error, success, result } = response.data;

    if (!success) throw new Error(error);

    return result;
};

export const triggerTrelloScrape = ({
    userId,
    workspaceId,
    contexts,
}) => async (dispatch) => {
    const api = getAPI();

    if (!userId) throw new Error("No userId provided");

    if (!workspaceId) throw new Error("No workspaceId provided");

    if (!contexts) throw new Error("No contexts are specified");

    const response = await api.post(
        `/integrations/${workspaceId}/${userId}/trello/trigger_scrape`,
        { contexts }
    );

    const { success, result, error } = response.data;

    if (success) {
        return result;
    } else {
        console.log("ERROR", error);
    }
};
