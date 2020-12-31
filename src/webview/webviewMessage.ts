interface OpenBrowserMessagePayload {
    url: string;
}

type WebviewMessagePayload = OpenBrowserMessagePayload;

export default interface WebviewMessage {
    type: string;
    payload: WebviewMessagePayload;
}
