import { AUTHENTICATE_USER, LOGOUT_USER } from "./types/AuthTypes";

import getAPI from "../api/api";

export const authenticateUser = (payload) => (dispatch) => {
    dispatch({
        type: AUTHENTICATE_USER,
        payload,
    });
};

export const logoutUser = (payload) => (dispatch) => {
    dispatch({
        type: LOGOUT_USER,
    });
};

export const encryptAuthToken = () => async () => {
    const api = getAPI();

    const response = await api.get("/auth/encrypt_ide_token");

    const { result, success } = response.data;

    if (success) {
        return result;
    }
};
