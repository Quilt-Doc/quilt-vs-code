import {
    window,
    TextEditor,
    DecorationOptions,
    Range,
    MarkdownString,
} from "vscode";

const { createTextEditorDecorationType } = window;

import { EXTENSION_NAME } from "../../constants/constants";

import BlameChunk from "./blameChunk";

class BlameDecorator {
    updateBlameDisplay(editor: TextEditor, blameChunks: BlameChunk[]) {
        console.log("\nQuilt: Entered into updateDecorations!\n");

        if (!editor) return;

        const colors = [
            { bg: "rgba(93,106,210,0.1)", bo: "rgba(93,106,210,0.15)" },
            { bg: "rgba(77,183,130,0.1)", bo: "rgba(77,183,130,0.15)" },
            { bg: "rgba(195,119,224,0.1)", bo: "rgba(195,119,224, 0.15)" },
            { bg: "rgba(197,41,40,0.1)", bo: "rgba(197,41,40,0.15)" },
            { bg: "rgba(37,181,206,0.1)", bo: "rgba(37,181,206,0.15)" },
            { bg: "rgba(235,87,87, 0.1)", bo: "rgba(235,87,87,0.15)" },
            { bg: "rgba(242,201,75,0.1)", bo: "rgba(242,201,75,0.15)" },
            { bg: "rgba(255,120,203,0.1)", bo: "rgba(255,120,203, 0.15)" },
            { bg: "rgba(235,90,71,0.1)", bo: "rgba(235,90,71,0.15)" },
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

        console.log("BLAME CHUNKS IN BLAME DECORATOR", blameChunks);

        blameChunks.map((chunk, i) => {
            const { start, end } = chunk;

            const range = new Range(
                editor.document.lineAt(start).range.start,
                editor.document.lineAt(end).range.end
            );

            const params = encodeURIComponent(JSON.stringify(start));

            const hoverMessage = new MarkdownString(
                `[Focus this blame annotation in Quilt](command:${EXTENSION_NAME}.focusBlameAnnotation?${params})`
            );

            hoverMessage.isTrusted = true;

            const decorationOpt = {
                range,
                hoverMessage,
            };

            decorations[i].decorationOptions.push(decorationOpt);
        });

        decorations = decorations.filter(
            (dec) => dec.decorationOptions.length != 0
        );

        console.log("DECORATIONS AFTER FILTERING", decorations);

        decorations.map((dec) => {
            const { decorationType, decorationOptions } = dec;

            editor.setDecorations(decorationType, decorationOptions);
        });
    }
}

export default BlameDecorator;
