import { SET_GIT_INFO } from "./types/GlobalTypes";

export const setGitInfo = (payload) => (dispatch) => {
    console.log("SET GIT INFO PAYLOAD", payload);
    dispatch({
        type: SET_GIT_INFO,
        payload,
    });
};
