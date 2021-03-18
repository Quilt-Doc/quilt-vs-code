export const sendExtensionMessage = (extensionMessagePayload) => (dispatch) => {
    const { dispatchType: type, value: payload } = extensionMessagePayload;

    console.log("STORING AUTH", extensionMessagePayload);

    dispatch({
        type,
        payload,
    });
};
