import { API as GitAPI, GitExtension, APIState } from "./git";
import { WebviewView, Disposable, extensions, window } from "vscode";

import { SET_GIT_INFO } from "../types/MessageTypes";

const { onDidChangeActiveTextEditor } = window;

class GitHandler {
    private git?: GitAPI;

    private gitStateListener?: Disposable;

    private activeEditorListener?: Disposable;

    private viewVisibilityListener?: Disposable;

    constructor(private _view: WebviewView) {
        const gitExtension = extensions.getExtension<GitExtension>("vscode.git")
            ?.exports;

        if (!gitExtension)
            throw new Error("GIT EXTENSION IS NOT PROPERLY EXTRACTED");

        this.git = gitExtension.getAPI(1);

        this.setUp();
    }

    setUp() {
        if (this.git?.state === "initialized") {
            this.handleGitInformation();
        } else {
            this.gitStateListener = this.git?.onDidChangeState((e) => {
                if (e === "initialized") {
                    this.handleGitInformation();
                }
            });
        }

        this.activeEditorListener = onDidChangeActiveTextEditor(() => {
            this.handleGitInformation();
        });

        this.viewVisibilityListener = this._view.onDidChangeVisibility((e) => {
            if (this._view.visible) this.handleGitInformation();
        });
        //need to also handle on open
    }

    extractFullName(fetchUrl: string) {
        if (fetchUrl.includes("https")) {
            //HTTP
            const splitUrl = fetchUrl.split("/");

            const owner = splitUrl[3];

            let name = splitUrl[4];

            name = splitUrl[4].slice(0, name.length - 4);

            return `${owner}/${name}`;
        } else {
            //SSL
            const splitUrl = fetchUrl.split(":");

            let repositoryFullName = splitUrl.slice(1).join(":");

            repositoryFullName = repositoryFullName.slice(
                0,
                repositoryFullName.length - 4
            );

            return repositoryFullName;
        }
    }

    handleGitInformation() {
        if (!this.git || this.git.repositories.length === 0) return;

        const selectedRepository = this.git.repositories.filter(
            (repository) => {
                const { ui } = repository;

                const { selected } = ui;

                return selected;
            }
        )[0];

        const {
            state: { remotes },
        } = selectedRepository;

        //TODO: Will need to handle when there is no remote
        if (!remotes || remotes.length === 0) return;

        //ONLY USE FIRST REMOTE FOR NOW
        const { fetchUrl } = remotes[0];

        if (!fetchUrl) return;

        const repositoryFullName = this.extractFullName(fetchUrl);

        const { activeTextEditor } = window;

        let activeFilePath;

        if (activeTextEditor) {
            const {
                document: { fileName },
            } = activeTextEditor;

            const { rootUri } = selectedRepository;

            const repositoryPath = rootUri.toString().slice(7);

            activeFilePath = fileName.slice(repositoryPath.length + 1);
        }

        this.postInfo(repositoryFullName, activeFilePath);
    }

    postInfo(repositoryFullName: string, activeFilePath?: string) {
        this._view.webview.postMessage({
            type: SET_GIT_INFO,
            payload: {
                repositoryFullName,
                activeFilePath,
            },
        });
    }

    dispose() {
        this.activeEditorListener?.dispose();

        this.gitStateListener?.dispose();

        this.viewVisibilityListener?.dispose();
    }
}

export default GitHandler;

/*

ITERATION 1

ACQUIRE REPOSITORY (NEED REPOSITORY FULL NAME??)

ACQUIRE CURRENTLY OPENED FILE PATH

PASS MESSAGE TO WEBVIEW 

WEBVIEW SHOULD HANDLE MESSAGE AND STORE INFORMATION

WEBVIEW SHOULD PULL CORRECT CONTEXT OBJECTS BASED ON NEW FILE

*/
