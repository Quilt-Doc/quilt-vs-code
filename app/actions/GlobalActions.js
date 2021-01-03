import { SET_GIT_INFO } from "./types/GlobalTypes";

export const setGitInfo = (payload) => (dispatch) => {
    dispatch({
        type: SET_GIT_INFO,
        payload,
    });
};
