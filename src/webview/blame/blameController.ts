import * as vscode from "vscode";

import {
    window,
    workspace,
    WebviewView,
    Disposable,
    TextEditor,
    languages,
    commands,
} from "vscode";

const { onDidChangeActiveTextEditor, activeTextEditor } = window;

const { onDidChangeTextDocument } = workspace;

import BlameDecorator from "./blameDecorator";
import BlameCodeLensProvider from "./blameCodeLensProvider";
import BlameChunk from "./blameChunk";

import { EXTENSION_NAME } from "../../constants/constants";
import { type } from "os";

class BlameController {
    private activeEditor?: TextEditor;

    private activeEditorListener?: Disposable;

    private textDocumentListener?: Disposable;

    private blameDecorator?: BlameDecorator;

    private blameCodeLensProvider?: BlameCodeLensProvider;

    private blameChunks: BlameChunk[] = [];

    constructor(private _view: WebviewView) {
        this.blameDecorator = new BlameDecorator();

        this.blameCodeLensProvider = new BlameCodeLensProvider();

        languages.registerCodeLensProvider("*", this.blameCodeLensProvider);

        this.registerBlameCommands();

        this.setEventListeners();

        this.updateBlame();
    }

    registerBlameCommands() {
        commands.registerCommand(
            `${EXTENSION_NAME}.focusBlameAnnotation`,
            (args: any) => {
                if (args == null || args == undefined) return;

                const blameStart = args;

                console.log(
                    "Quilt Blame: Sending message FOCUS_BLAME_ANNOTATION"
                );

                this._view?.webview.postMessage({
                    type: "FOCUS_BLAME_ANNOTATION",
                    payload: blameStart,
                });
            }
        );
    }

    setEventListeners() {
        this.activeEditor = activeTextEditor;

        this.activeEditorListener = onDidChangeActiveTextEditor((editor) => {
            this.activeEditor = editor;

            //this.updateBlame();
        });

        /*
        this.textDocumentListener = onDidChangeTextDocument((event) => {
            if (
                this.activeEditor &&
                event.document === this.activeEditor.document
            ) {
                this.updateBlame();
            }
        });*/
    }

    handleWebviewBlameMessage(message: any) {
        const { type, payload } = message;

        console.log("\nQuilt Blame: Handling message --", message);

        if (type == "GET_DOCUMENT_TEXT") {
            console.log(
                "\nQuilt Blame: Entered with message GET_DOCUMENT_TEXT"
            );

            const documentText = this.activeEditor?.document.getText();

            console.log("\nQuilt Blame: Sending message RECEIVE_DOCUMENT_TEXT");

            this._view?.webview.postMessage({
                type: "RECEIVE_DOCUMENT_TEXT",
                payload: documentText,
            });
        }

        if (type == "COMMUNICATE_BLAME") {
            console.log(
                "\nQuilt Blame: Received blame with message COMMUNICATE_BLAME"
            );

            this.blameChunks = payload;

            this.updateBlame();
        }
    }

    updateBlame() {
        if (
            this.blameDecorator &&
            this.activeEditor &&
            this.blameCodeLensProvider
        ) {
            this.blameDecorator.updateBlameDisplay(
                this.activeEditor,
                this.blameChunks
            );

            this.blameCodeLensProvider.setChunks(this.blameChunks);
        }
    }

    dispose() {
        this.activeEditorListener?.dispose();

        this.textDocumentListener?.dispose();
    }
}

export default BlameController;
