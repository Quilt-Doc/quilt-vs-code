import axios from "axios";

const baseURL = "http://localhost:3001/api";

export const storeExtensionMessage = (extensionMessagePayload) => (
    dispatch
) => {
    const { dispatchType: type, value: payload } = extensionMessagePayload;

    console.log("STORING AUTH", extensionMessagePayload);

    dispatch({
        type,
        payload,
    });
};

export const extensionAuthenticateUser = (payload) => async (dispatch) => {
    const { value: formValues, dispatchType: type } = payload;

    const { userId, isAuthorized, jwt } = formValues;

    if (!userId) console.log("No User Id");

    if (!isAuthorized) console.log("not isAuthorized");

    if (!jwt) console.log("No Jwt");

    const response = await axios.get(`${baseURL}/users/get/${userId}`, {
        headers: {
            authorization: `Bearer ${jwt}`,
        },
    });

    console.log("RESPONSE", response);

    const { success, result } = response.data;

    if (success == false) {
        console.log("Error");
    } else {
        dispatch({
            type,
            payload: {
                isAuthorized,
                jwt,
                user: result,
            },
        });
    }
};
