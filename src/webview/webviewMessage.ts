interface MessagePayload {
    url: string;

    key: string;

    dispatchType: string;

    value: string;
}

type WebviewMessagePayload = MessagePayload;

export default interface WebviewMessage {
    type: string;
    payload: WebviewMessagePayload;
}
