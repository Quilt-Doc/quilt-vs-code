import * as vscode from "vscode";

import {
    window,
    workspace,
    WebviewView,
    Disposable,
    TextEditor,
    languages,
    commands,
    Range,
} from "vscode";

const {
    onDidChangeActiveTextEditor,
    activeTextEditor,
    onDidChangeTextEditorSelection,
} = window;

const { onDidChangeTextDocument } = workspace;

import BlameDecorator from "./blameDecorator";
import BlameCodeLensProvider from "./blameCodeLensProvider";
import BlameChunk from "./blameChunk";

import { EXTENSION_NAME } from "../../constants/constants";

class BlameController {
    private activeEditor?: TextEditor;

    private activeEditorListener?: Disposable;

    private textDocumentListener?: Disposable;

    private editorSelectionListener?: Disposable;

    private viewVisibilityListener?: Disposable;

    private blameDecorator?: BlameDecorator;

    private blameCodeLensProvider?: BlameCodeLensProvider;

    private blameChunks: BlameChunk[] = [];

    private focusedChunk: number = 0;

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
            this.removeBlame();

            this.activeEditor = editor;

            this.requestBlame();
        });

        this.editorSelectionListener = onDidChangeTextEditorSelection(
            (event) => {
                const { selections } = event;

                if (selections.length == 0) return;

                const {
                    start: { line },
                } = selections[0];

                this.blameChunks.map((chunk) => {
                    const { start, end } = chunk;

                    if (line >= start && line <= end) {
                        this._view?.webview.postMessage({
                            type: "SELECT_BLAME_ANNOTATION",
                            payload: start,
                        });
                    }
                });
            }
        );

        this.viewVisibilityListener = this._view.onDidChangeVisibility((e) => {
            if (this._view.visible) {
                this.requestBlame();
            } else {
                this.removeBlame();
            }
        });

        // when actual content of changes
        this.textDocumentListener = onDidChangeTextDocument((event) => {
            if (
                this.activeEditor &&
                event.document === this.activeEditor.document &&
                this._view.visible
            ) {
                this.requestBlame();
            }
        });
    }

    handleWebviewBlameMessage(message: any) {
        const { type, payload } = message;

        if (type == "GET_DOCUMENT_TEXT") {
            this.requestBlame();
        }

        if (type == "COMMUNICATE_BLAME") {
            const { blameChunks, focusedChunk } = payload;

            this.blameChunks = blameChunks;

            this.focusedChunk = focusedChunk;

            this.updateBlame();
        }

        if (type == "FOCUS_CHUNK") {
            const { focusedChunk, shouldScroll } = payload;

            this.focusedChunk = focusedChunk;

            if (shouldScroll) this.scrollToChunk();

            this.updateBlame();
        }

        if (type == "REMOVE_BLAME") {
            this.removeBlame();
        }
    }

    requestBlame() {
        const documentText = this.activeEditor?.document.getText();

        this._view?.webview.postMessage({
            type: "RECEIVE_DOCUMENT_TEXT",
            payload: documentText,
        });
    }

    scrollToChunk = () => {
        const focusedChunk = this.blameChunks.filter(
            (chunk) => chunk.start == this.focusedChunk
        )[0];

        let { start, end } = focusedChunk;

        if (start != 0) start -= 1;

        const range = new Range(
            this.activeEditor.document.lineAt(start).range.start,
            this.activeEditor.document.lineAt(end).range.end
        );

        this.activeEditor.revealRange(range);
    };

    updateBlame() {
        if (
            this.blameDecorator &&
            this.activeEditor &&
            this.blameCodeLensProvider &&
            this.blameChunks.length > 0
        ) {
            this.blameDecorator.updateBlameDisplay(
                this.activeEditor,
                this.blameChunks,
                this.focusedChunk
            );

            this.blameCodeLensProvider.setChunks(this.blameChunks);
        }
    }

    removeBlame() {
        this.blameChunks = [];

        if (this.blameDecorator && this.blameCodeLensProvider) {
            this.blameDecorator.removeBlameDecorations();

            this.blameCodeLensProvider.setChunks(this.blameChunks);
        }
    }

    dispose() {
        this.removeBlame();

        this.activeEditorListener?.dispose();

        this.textDocumentListener?.dispose();
    }
}

export default BlameController;
