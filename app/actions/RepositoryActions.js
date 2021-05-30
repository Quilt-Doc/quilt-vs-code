import _ from "lodash";

import { RETRIEVE_REPOSITORIES } from "./types/RepositoryTypes";

import getAPI from "../api/api";

import { checkValid } from "../utils";

export const setRepositories = ({ repositories }) => (dispatch) => {
    dispatch({
        type: RETRIEVE_REPOSITORIES,
        payload: repositories,
    });
};

export const initRepository = (formValues) => async () => {
    const api = getAPI();

    const { isPublic, publicHtmlUrl } = formValues;

    if (!checkValid(isPublic)) {
        throw new Error();
    }

    if (!checkValid(publicHtmlUrl)) {
        throw new Error();
    }

    let response;

    try {
        response = await api.post("/repositories/init", formValues);
    } catch (e) {
        console.log(e);
    }

    const { success, result, error } = response.data;

    console.log("Result", result);

    if (success == false) {
        throw new Error(error.toString());
    } else {
        return result;
    }
};
