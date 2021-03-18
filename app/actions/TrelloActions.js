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

    const response = await api.get(
        `/integrations/${workspaceId}/${userId}/trello/get_external_boards`,
        formValues
    );

    const { error, success, result } = response.data;

    console.log("RESULT IN ACTION", result);

    if (!success) throw new Error(error);

    return result;
};

export const triggerTrelloScrape = ({
    userId,
    workspaceId,
    boards,
}) => async () => {
    const api = getAPI();

    if (!userId) throw new Error("No userId provided");

    if (!workspaceId) throw new Error("No workspaceId provided");

    if (!boards) throw new Error("No boards are specified");

    const response = await api.post(
        `/integrations/${workspaceId}/${userId}/trello/trigger_scrape`,
        { boards }
    );

    const { success, result, error } = response.data;

    if (success) {
        return result;
    } else {
        console.log("ERROR", error);
    }
};
