"use strict";

import {
    WebviewViewProvider,
    WebviewView,
    Uri,
    WebviewViewResolveContext,
    CancellationToken,
    Webview,
    ExtensionContext,
    env,
    window,
    Memento,
} from "vscode";

import BlameController from "./blame/blameController";
import GitHandler from "./git/gitHandler";
import WebviewMessage from "./webviewMessage";
import LocalStorageService from "./local_storage/localStorageService";

import {
    OPEN_BROWSER,
    CHANGE_THEME,
    GET_VALUE_GLOBAL_STORAGE,
    SET_VALUE_GLOBAL_STORAGE,
    RECEIVE_VALUE_GLOBAL_STORAGE,
} from "./types/MessageTypes";
import { EXTENSION_NAME } from "../constants/constants";

const { onDidChangeActiveColorTheme } = window;

class QuiltViewProvider implements WebviewViewProvider {
    public static readonly quiltViewId = `${EXTENSION_NAME}.view`;

    private _view?: WebviewView;

    private _globalStore?: LocalStorageService;

    private _blameController?: BlameController;

    constructor(private readonly _extensionUri: Uri, globalState: Memento) {
        this._globalStore = new LocalStorageService(globalState);
    }

    public resolveWebviewView = (
        webviewView: WebviewView,
        context: WebviewViewResolveContext,
        _token: CancellationToken
    ) => {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,

            localResourceRoots: [this._extensionUri],
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(this._handleWebviewMessage);

        const themeChangeListener = onDidChangeActiveColorTheme(
            this._handleThemeChange
        );

        const gitHandler = new GitHandler(webviewView);

        this._blameController = new BlameController(webviewView);

        webviewView.onDidDispose(() => {
            themeChangeListener.dispose();
            gitHandler.dispose();
            this._blameController.dispose();
        });
    };

    private _handleWebviewMessage = (message: WebviewMessage) => {
        const { type, payload } = message;

        if (type == OPEN_BROWSER) {
            const { openExternal } = env;

            const { url } = payload;

            openExternal(Uri.parse(url));
        }

        if (type == GET_VALUE_GLOBAL_STORAGE) {
            this._globalStore?.getValue(payload.key);

            this._view?.webview.postMessage({
                type: RECEIVE_VALUE_GLOBAL_STORAGE,
                payload: {
                    value: this._globalStore?.getValue(payload.key),
                    dispatchType: payload.dispatchType,
                },
            });
        }

        if (type == SET_VALUE_GLOBAL_STORAGE) {
            this._globalStore?.setValue(payload.key, payload.value);
        }

        this._blameController.handleWebviewBlameMessage(message);
    };

    private _handleThemeChange = () => {
        this._view?.webview.postMessage({
            type: CHANGE_THEME,
        });
    };

    private _getHtmlForWebview = (webview: Webview) => {
        const scriptUri = webview.asWebviewUri(
            Uri.joinPath(this._extensionUri, "dist", "main.js")
        );

        const styleUri = webview.asWebviewUri(
            Uri.joinPath(this._extensionUri, "dist", "app.css")
        );

        const nonce = getNonce();

        const defaultSrc = `default-src 'none';`;

        const connectSrc = `connect-src *.sentry.io http://localhost:3001;`;

        const styleSrc = `style-src 'unsafe-inline' ${webview.cspSource} https://fonts.googleapis.com;`;

        const imgSrc = ` img-src data: ${webview.cspSource} https:; `;

        const fontSrc = `font-src 'self' https://fonts.gstatic.com;`;

        const scriptSrc = `script-src 'unsafe-eval' ${webview.cspSource};`;

        return `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="Content-Security-Policy" content="${defaultSrc} ${connectSrc} ${styleSrc} ${imgSrc} ${fontSrc} ${scriptSrc}">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" type="text/css" href="${styleUri}" media="screen" />
                    <link rel="preconnect" href="https://fonts.gstatic.com">
                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;600&display=swap" rel="stylesheet">
                    <title>Quilt</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body>
                    <div id="root"></div>
                    <!-- Load our React component. -->
                    <script src="${scriptUri}"></script>
                    
                </body>
            </html>`;
    };
}

const getNonce = () => {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export default QuiltViewProvider;
