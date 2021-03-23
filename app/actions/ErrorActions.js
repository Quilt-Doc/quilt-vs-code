import {
    SET_HAS_ERROR,
    SET_ALERT_ERROR,
    CLEAR_ERROR,
} from "./types/ErrorTypes";

export const errs = {
    0: "Posting to backend API failed.",
    1: "Success in response of backend API call was false.",
};

export const triggerError = (dispatch) => {
    dispatch({
        type: SET_HAS_ERROR,
        payload: false,
    });
};

export const triggerAlert = (alert, dispatch) => {
    dispatch({
        type: SET_ALERT_ERROR,
        payload: alert,
    });
};

export const clearError = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR,
    });
};
