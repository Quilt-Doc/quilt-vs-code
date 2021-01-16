import {
    CHECK_GITHUB_INSTALLATIONS,
    RETRIEVE_GITHUB_REPOSITORIES,
} from "./types/GithubTypes";

import getAPI from "../api/api";

export const checkGithubInstallations = (formValues) => async (dispatch) => {
    const api = getAPI();

    const response = await api.post("/auth/check_installation", formValues);

    console.log("RESPONSE", response.data);

    if (response.data.success == false) {
        throw new Error(response.data.error.toString());
    } else {
        dispatch({
            type: CHECK_GITHUB_INSTALLATIONS,
            payload: response.data.result,
        });
    }
};

export const retrieveGithubRepositories = (formValues) => async (dispatch) => {
    const api = getAPI();

    const { userId } = formValues;

    if (!userId)
        throw new Error(
            "retrieveGithubRepositories Error: userId not provided."
        );

    const response = await api.post(
        `/repositories/${userId}/retrieve_creation`,
        formValues
    );

    console.log("REPOS", response.data);

    if (response.data.success == false) {
        throw new Error(response.data.error.toString());
    } else {
        dispatch({
            type: RETRIEVE_GITHUB_REPOSITORIES,
            payload: response.data.result,
        });
    }
};
