import {
    window,
    TextEditor,
    DecorationOptions,
    Range,
    MarkdownString,
} from "vscode";

import chroma from "chroma-js";

const { createTextEditorDecorationType } = window;

import { EXTENSION_NAME } from "../../constants/constants";

import BlameChunk from "./blameChunk";

class BlameDecorator {
    private disposableDecorations: any[] = [];

    removeBlameDecorations() {
        this.disposableDecorations.map((dec) => {
            const { decorationType } = dec;

            decorationType.dispose();
        });
    }

    updateBlameDisplay(
        editor: TextEditor,
        blameChunks: BlameChunk[],
        focusedChunk: Number
    ) {
        this.removeBlameDecorations();

        if (!editor) return;

        const colors = [
            "rgb(93,106,210)",
            "rgb(77,183,130)",
            "rgb(195,119,224)",
            "rgb(197,41,40)",
            "rgb(37,181,206)",
            "rgb(235,87,87)",
            "rgb(242,201,75)",
            "rgb(255,120,203)",
            "rgb(235,90,71)",
        ];

        let focusIndex = 0;

        blameChunks.map((chunk, i) => {
            if (chunk.start == focusedChunk) {
                focusIndex = i;
            }
        });

        let topDecorations: any[] = [];

        let botDecorations: any[] = [];

        let decorations = colors.map((color, i) => {
            const isFocused = i == focusIndex;

            const backgroundColor = isFocused
                ? chroma(color).alpha(0.15).hex()
                : chroma(color).alpha(0.04).hex();

            const borderColor = isFocused
                ? chroma(color).alpha(0.3).hex()
                : chroma(color).alpha(0.15).hex();

            const borderStyle = "solid"; // ridged

            const borderWidth = "2px";

            const borderRadius = "15px";

            const base = {
                isWholeLine: true,
                borderColor,
                borderStyle,
                backgroundColor,
            };

            const topDecorationType = createTextEditorDecorationType({
                ...base,
                borderWidth: `${borderWidth} ${borderWidth} 0px ${borderWidth}`,
                borderRadius: `${borderRadius} ${borderRadius} 0px 0px`,
            });

            const botDecorationType = createTextEditorDecorationType({
                ...base,
                borderWidth: `0 ${borderWidth} ${borderWidth} ${borderWidth}`,
                borderRadius: `0px 0px ${borderRadius} ${borderRadius}`,
            });

            const bodyDecorationType = createTextEditorDecorationType({
                ...base,
                borderWidth: `0px ${borderWidth} 0px ${borderWidth}`,
            });

            topDecorations.push({
                decorationType: topDecorationType,
                decorationOptions: [],
            });

            botDecorations.push({
                decorationType: botDecorationType,
                decorationOptions: [],
            });

            let decorationOptions: DecorationOptions[] = [];

            return {
                decorationType: bodyDecorationType,
                decorationOptions,
            };
        });

        blameChunks.map((chunk, i) => {
            const { start, end } = chunk;

            const range = new Range(
                editor.document.lineAt(start + 1).range.start,
                editor.document.lineAt(end - 1).range.end
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

            const topRange = new Range(
                editor.document.lineAt(start).range.start,
                editor.document.lineAt(start).range.start
            );

            topDecorations[i].decorationOptions.push({
                range: topRange,
            });

            const botRange = new Range(
                editor.document.lineAt(end).range.start,
                editor.document.lineAt(end).range.end
            );

            botDecorations[i].decorationOptions.push({
                range: botRange,
            });

            const x = 5;
        });

        decorations = decorations.filter(
            (dec) =>
                dec.decorationOptions.length != 0 || dec.decorationType == null
        );

        botDecorations = botDecorations.filter(
            (dec) =>
                dec.decorationOptions.length != 0 || dec.decorationType == null
        );

        topDecorations = topDecorations.filter(
            (dec) =>
                dec.decorationOptions.length != 0 || dec.decorationType == null
        );

        this.disposableDecorations = [
            ...decorations,
            ...botDecorations,
            ...topDecorations,
        ];

        this.disposableDecorations.map((dec) => {
            const { decorationType, decorationOptions } = dec;

            editor.setDecorations(decorationType, decorationOptions);
        });
    }
}

export default BlameDecorator;

/* if (isFocused) {
    focusedTopBorderDecoration.decorationType = createTextEditorDecorationType(
        {
            isWholeLine: true,
            borderWidth: "2px 2px 0px 2px",
            borderColor,
            borderStyle,
            borderRadius: "15px 15px 0px 0px",
            backgroundColor,
        }
    );

    focusedBottomBorderDecoration.decorationType = createTextEditorDecorationType(
        {
            isWholeLine: true,
            borderWidth: "0px 2px 2px 2px",
            borderColor,
            borderStyle,
            borderRadius: "0px 0px 15px 15px",
            backgroundColor,
        }
    );
} */
