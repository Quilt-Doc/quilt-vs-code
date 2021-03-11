import { ExtensionContext, commands, window } from "vscode";

import QuiltViewProvider from "./webview/quiltViewProvider";

import { EXTENSION_NAME } from "./constants/constants";

const { registerCommand } = commands;

const { showInformationMessage, registerWebviewViewProvider } = window;

export const activate = (context: ExtensionContext) => {
    const { extensionUri, globalState } = context;

    const provider = new QuiltViewProvider(extensionUri, globalState);

    const { quiltViewId } = QuiltViewProvider;

    const webviewRegistration = registerWebviewViewProvider(
        quiltViewId,
        provider,
        {
            webviewOptions: {
                retainContextWhenHidden: true,
            },
        }
    );

    context.subscriptions.push(webviewRegistration);

    const helloExample = registerCommand(`${EXTENSION_NAME}.helloWorld`, () => {
        showInformationMessage("Hello World");
    });

    context.subscriptions.push(helloExample);
};

export const deactivate = () => {};
