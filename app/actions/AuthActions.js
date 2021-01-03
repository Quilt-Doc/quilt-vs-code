import { AUTHENTICATE_USER } from "./types/AuthTypes";

export const authenticateUser = (payload) => (dispatch) => {
    dispatch({
        type: AUTHENTICATE_USER,
        payload,
    });
};
