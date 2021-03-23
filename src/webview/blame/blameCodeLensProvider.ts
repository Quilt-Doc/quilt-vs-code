import {
    CodeLens,
    EventEmitter,
    Event,
    TextDocument,
    CancellationToken,
    CodeLensProvider,
} from "vscode";

import { EXTENSION_NAME } from "../../constants/constants";

import BlameChunk from "./blameChunk";

class BlameCodeLensProvider implements CodeLensProvider {
    private codeLenses: CodeLens[] = [];

    private isActive: Boolean = true;

    private blameChunks: BlameChunk[] = [];

    private _onDidChangeCodeLenses: EventEmitter<void> = new EventEmitter<void>();

    public readonly onDidChangeCodeLenses: Event<void> = this
        ._onDidChangeCodeLenses.event;

    constructor() {
        //this._onDidChangeBlameCodeLenses.fire();
    }

    public setChunks(blameChunks: BlameChunk[]) {
        //console.log("QUILT: ENTERED IN HERE setChunks");

        this.blameChunks = blameChunks;

        this.isActive = true;

        this._onDidChangeCodeLenses.fire();
    }

    public provideCodeLenses(
        document: TextDocument,
        token: CancellationToken
    ): CodeLens[] | Thenable<CodeLens[]> {
        //console.log("\nQuilt: Entered in provideCodeLenses\n");

        if (this.isActive) {
            this.codeLenses = this.blameChunks.map((chunk) => {
                let { start } = chunk;

                return new CodeLens(document.lineAt(start).range);
            });

            //console.log("QUILT CODE LENSES: ", this.codeLenses);

            return this.codeLenses;
        }

        return [];
    }

    public resolveCodeLens(codeLens: CodeLens, token: CancellationToken) {
        if (this.isActive) {
            codeLens.command = {
                title: "Focus this blame annotation in Quilt.",
                tooltip: "Focus this blame annotation in Quilt.",
                command: `${EXTENSION_NAME}.focusBlameAnnotation`,
                arguments: [codeLens.range.start.line],
            };
            return codeLens;
        }

        return null;
    }
}

export default BlameCodeLensProvider;
