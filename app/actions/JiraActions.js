import getAPI from "../api/api";

export const getExternalJiraBoards = (formValues) => async () => {
    const api = getAPI();

    const { workspaceId, userId } = formValues;

    if (!workspaceId) throw new Error("No workspaceId provided");

    if (!userId) throw new Error("No userId provided");

    const response = await api.get(
        `/integrations/${workspaceId}/jira/get_external_boards`,
        formValues
    );

    const { error, success, result } = response.data;

    if (!success) throw new Error(error);

    return result;
};

export const triggerJiraScrape = ({
    userId,
    workspaceId,
    boards,
}) => async () => {
    const api = getAPI();

    if (!userId) throw new Error("No userId provided");

    if (!workspaceId) throw new Error("No workspaceId provided");

    if (!boards) throw new Error("No boards are specified");

    console.log("ROUTE", `/integrations/${workspaceId}/jira/trigger_scrape`);

    console.log("BODY", { projects: boards });

    const response = await api.post(
        `/integrations/${workspaceId}/jira/trigger_scrape`,
        { projects: boards }
    );

    const { success, result, error } = response.data;

    console.log("SUCCESS", success);

    if (success) {
        return result;
    } else {
        console.log("ERROR", error);
    }
};

export const createJiraAccessToken = ({
    tokenValue,
    emailAddress,
    workspaceId,
}) => async () => {
    console.log(
        "ENTERED IN ROUTE WITH PARAMS",
        tokenValue,
        emailAddress,
        workspaceId
    );

    const api = getAPI();

    if (!tokenValue) {
        throw new Error();
    }

    if (!emailAddress) {
        throw new Error();
    }

    if (!workspaceId) {
        throw new Error();
    }

    let response;

    try {
        response = await api.post(
            `/integrations/${workspaceId}/jira/create_personal_token`,
            {
                tokenValue,
                emailAddress,
            }
        );
    } catch (e) {
        console.log("ERROR IN RESPONSE", e);
    }

    console.log("RESPONSE", response.data);

    const { success, result, error } = response.data;

    return success;
};
