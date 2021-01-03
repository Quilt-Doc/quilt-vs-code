import { EDIT_USER } from "./types/UserTypes";

import getAPI from "../api/api";

export const editUser = (formValues) => async (dispatch) => {
    const { userId } = formValues;

    const api = getAPI();

    if (!userId) throw new Error("editUser: userId not provided");

    const response = await api.put(`/users/edit/${userId}`, formValues);

    const { success, result, error } = response.data;

    if (!success) {
        throw new Error(error);
    } else {
        dispatch({ type: EDIT_USER, payload: result });
    }
};
