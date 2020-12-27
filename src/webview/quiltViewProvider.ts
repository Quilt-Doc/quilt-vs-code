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
} from "vscode";

import WebviewMessage from "./webviewMessage";
import { OPEN_BROWSER } from "./types/messageTypes";

import { EXTENSION_NAME } from "../constants/constants";

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

            // retainContextWhenHidden: true
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(this._handleWebviewMessage);
    };

    private _handleWebviewMessage = (message: WebviewMessage) => {
        const { command, data } = message;

        switch (command) {
            case OPEN_BROWSER:
                const { openExternal } = env;

                const { url } = data;

                openExternal(Uri.parse(url));
        }
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
                    <title>Quilt</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <script>
                        /*
                        window.acquireVsCodeApi = acquireVsCodeApi;
                        console.log('Called');
                        */
                    </script>
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
