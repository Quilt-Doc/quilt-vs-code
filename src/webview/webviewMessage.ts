interface OpenBrowserMessageData {
    url: string;
}

type WebviewMessageData = OpenBrowserMessageData;

export default interface WebviewMessage {
    command: string;
    data: WebviewMessageData;
}
