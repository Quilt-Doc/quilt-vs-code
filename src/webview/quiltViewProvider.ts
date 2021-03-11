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

import SnippetDecorator from "./snippet_decorator/snippetDecorator";
import GitHandler from "./git/gitHandler";
import WebviewMessage from "./webviewMessage";
import LocalStorageService from "./local_storage/localStorageService";

import {
    OPEN_BROWSER,
    CHANGE_THEME,
    GET_VALUE_GLOBAL_STORAGE,
    SET_VALUE_GLOBAL_STORAGE,
    SEND_VALUE_GLOBAL_STORAGE,
} from "./types/MessageTypes";
import { EXTENSION_NAME } from "../constants/constants";

const { onDidChangeActiveColorTheme } = window;

class QuiltViewProvider implements WebviewViewProvider {
    public static readonly quiltViewId = `${EXTENSION_NAME}.view`;

    private _view?: WebviewView;

    private _globalStore?: LocalStorageService;

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

        const snippetDecorator = new SnippetDecorator(webviewView);

        webviewView.onDidDispose(() => {
            themeChangeListener.dispose();
            gitHandler.dispose();
            snippetDecorator.dispose();
        });
    };

    private _handleWebviewMessage = (message: WebviewMessage) => {
        console.log("MESSAGE ENTERED", message);

        const { type, payload } = message;

        if (type == OPEN_BROWSER) {
            const { openExternal } = env;

            const { url } = payload;

            openExternal(Uri.parse(url));
        }

        if (type == GET_VALUE_GLOBAL_STORAGE) {
            console.log(
                `ENTERED GET_VALUE_GLOBAL_STORAGE WITH KEY : ${payload.key} WITH TYPE : ${type}`
            );

            this._globalStore?.getValue(payload.key);

            console.log("TO BE PAYLOAD TO EXTENSION", {
                value: this._globalStore?.getValue(payload.key),
                dispatchType: payload.dispatchType,
            });

            this._view?.webview.postMessage({
                type: SEND_VALUE_GLOBAL_STORAGE,
                payload: {
                    value: this._globalStore?.getValue(payload.key),
                    dispatchType: payload.dispatchType,
                },
            });
        }

        if (type == SET_VALUE_GLOBAL_STORAGE) {
            console.log(
                `ENTERED SET_VALUE_GLOBAL_STORAGE WITH KEY : ${payload.key} WITH VALUE : ${payload.value} WITH TYPE : ${type}`
            );

            this._globalStore?.setValue(payload.key, payload.value);
        }
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

        return `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" type="text/css" href="${styleUri}" media="screen" />
                    <link rel="preconnect" href="https://fonts.gstatic.com">
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
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
    // <script src="${scriptUri}"></script>
    //  <link rel="stylesheet" type="text/css" href="${styleUri}" media="screen" />
}

export default QuiltViewProvider;
