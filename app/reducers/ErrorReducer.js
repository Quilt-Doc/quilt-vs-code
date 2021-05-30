import {
    SET_ALERT_ERROR,
    SET_HAS_ERROR,
    CLEAR_ERROR,
} from "../actions/types/ErrorTypes";

const INITIAL_STATE = {
    hasError: false,
    alert: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_HAS_ERROR:
            return { hasError: action.payload, alert: null };

        case SET_ALERT_ERROR:
            return { hasError: false, alert: action.payload };

        case CLEAR_ERROR:
            return INITIAL_STATE;

        default:
            return state;
    }
};
