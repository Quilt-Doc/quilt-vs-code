import {
    CHECK_GITHUB_INSTALLATIONS,
    RETRIEVE_GITHUB_REPOSITORIES,
} from "./types/GithubTypes";

import getAPI from "../api/api";
import { checkValid } from "../utils";

export const checkGithubInstallations = (formValues) => async (dispatch) => {
    const api = getAPI();

    console.log("Formvalues", formValues);

    const response = await api.post("/auth/check_installation", formValues);

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
        throw new Error("retrieveGithubRepositories Error: userId not provided.");

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

export const searchPublicGithubRepositories = (formValues) => async () => {
    console.log("Entered searchPublicGithubRepositories");

    const api = getAPI();

    const { query } = formValues;

    if (!checkValid(query)) {
        throw new Error("searchPublicGithubRepositories Error: query not provided.");
    }

    let response;

    try {
        response = await api.post("/repositories/search_public_repos", formValues);
    } catch (e) {
        console.log(e);

        throw new Error(e);
    }

    const { success, result, error } = response.data;
    console.log("🚀 ~ result", result);

    if (success == false) {
        throw new Error(error.toString());
    } else {
        return result;
    }
};
