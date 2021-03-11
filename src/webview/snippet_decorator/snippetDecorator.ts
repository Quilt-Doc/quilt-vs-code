import * as vscode from "vscode";

import {
    window,
    workspace,
    WebviewView,
    Disposable,
    TextEditor,
    DecorationOptions,
    Range,
} from "vscode";

const {
    onDidChangeActiveTextEditor,
    createTextEditorDecorationType,
    activeTextEditor,
} = window;

const { onDidChangeTextDocument } = workspace;

class SnippetDecorator {
    private activeEditor?: TextEditor;

    private activeEditorListener?: Disposable;

    private textDocumentListener?: Disposable;

    constructor(private _view: WebviewView) {
        this.setUp();
    }

    setUp() {
        this.activeEditor = activeTextEditor;

        this.updateDecorations();

        this.activeEditorListener = onDidChangeActiveTextEditor((editor) => {
            this.activeEditor = editor;

            if (editor) {
                this.updateDecorations();
            }
        });

        this.textDocumentListener = onDidChangeTextDocument((event) => {
            if (
                this.activeEditor &&
                event.document === this.activeEditor.document
            ) {
                this.updateDecorations();
            }
        });
    }

    updateDecorations() {
        console.log("\nQuilt: Entered into updateDecorations!\n");

        if (!this.activeEditor) {
            return;
        }

        const colors = [
            { bg: "rgba(93,106,210,0.08)", bo: "rgba(93,106,210,0.15)" },
            { bg: "rgba(77,183,130,0.08)", bo: "rgba(77,183,130,0.15)" },
            { bg: "rgba(195,119,224,0.08)", bo: "rgba(195,119,224, 0.15)" },
            { bg: "rgba(197,41,40,0.08)", bo: "rgba(197,41,40,0.15)" },
            { bg: "rgba(37,181,206,0.08)", bo: "rgba(37,181,206,0.15)" },
            { bg: "rgba(235,87,87, 0.08)", bo: "rgba(235,87,87,0.15)" },
            { bg: "rgba(242,201,75,0.08)", bo: "rgba(242,201,75,0.15)" },
            { bg: "rgba(255,120,203,0.08)", bo: "rgba(255,120,203, 0.15)" },
            { bg: "rgba(235,90,71,0.08)", bo: "rgba(235,90,71,0.15)" },
        ];

        let decorations = colors.map((color) => {
            const decorationType = createTextEditorDecorationType({
                isWholeLine: true,
                backgroundColor: color.bg,
                borderWidth: "0px 0px 0px 2px",
                borderColor: color.bo,
                borderStyle: "solid",
            });

            let decorationOptions: DecorationOptions[] = [];

            return {
                decorationType,
                decorationOptions,
            };
        });

        const text = this.activeEditor.document.getText();

        const lineCount = this.activeEditor.document.lineCount;

        let counter = 0;

        for (let i = 0; i + 20 < lineCount; i += 30) {
            const start = this.activeEditor.document.lineAt(i).range.start;

            const end = this.activeEditor.document.lineAt(i + 23).range.end;

            const range = new Range(start, end);

            const decorationOpt = {
                range,
                hoverMessage: `Bang Bang Go Get It ${i}`,
            };

            decorations[counter].decorationOptions.push(decorationOpt);

            if (counter < colors.length - 1) counter += 1;
        }

        decorations.map((dec) => {
            const { decorationType, decorationOptions } = dec;

            this.activeEditor.setDecorations(decorationType, decorationOptions);
        });
    }

    dispose() {
        this.activeEditorListener?.dispose();

        this.textDocumentListener?.dispose();
    }
}

export default SnippetDecorator;
