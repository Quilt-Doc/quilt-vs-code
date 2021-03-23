import { RETRIEVE_REPOSITORIES } from "./types/RepositoryTypes";

export const setRepositories = ({ repositories }) => (dispatch) => {
    dispatch({
        type: RETRIEVE_REPOSITORIES,
        payload: repositories,
    });
};
