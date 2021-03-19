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

export const extensionAuthenticateUser = (payload) => {
    const { values: formValues, dispatchType: type } = payload;

    const { userId, isAuthorized, jwt } = formValues;

    if (!userId) console.log("No User Id");

    if (!isAuthorized) console.log("not isAuthorized");

    if (!jwt) console.log("No Jwt");

    const response = axios.get(`${baseURL}/users/get/${userId}`, {
        headers: {
            authorization: `Bearer ${jwt}`,
        },
    });

    const { success, result } = response;

    if (!success) {
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
