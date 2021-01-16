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
} from "vscode";

import GitHandler from "./git/gitHandler";
import WebviewMessage from "./webviewMessage";

import { OPEN_BROWSER, CHANGE_THEME } from "./types/MessageTypes";
import { EXTENSION_NAME } from "../constants/constants";

const { onDidChangeActiveColorTheme } = window;

class QuiltViewProvider implements WebviewViewProvider {
    public static readonly quiltViewId = `${EXTENSION_NAME}.view`;

    private _view?: WebviewView;

    constructor(private readonly _extensionUri: Uri) {}

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

        webviewView.onDidDispose(() => {
            themeChangeListener.dispose();
            gitHandler.dispose();
        });
    };

    private _handleWebviewMessage = (message: WebviewMessage) => {
        const { type, payload } = message;

        switch (type) {
            case OPEN_BROWSER:
                const { openExternal } = env;

                const { url } = payload;

                openExternal(Uri.parse(url));
            default:
                return;
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
