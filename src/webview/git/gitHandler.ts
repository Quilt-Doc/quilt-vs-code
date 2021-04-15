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

        // handles changing active repository and path on editor change
        // when extension is open
        this.activeEditorListener = onDidChangeActiveTextEditor(() => {
            this.handleGitInformation();
        });

        // handles changing active repository and path on extension opening
        this.viewVisibilityListener = this._view.onDidChangeVisibility((e) => {
            if (this._view.visible) this.handleGitInformation();
        });
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
        // no repositories were identified in current explorer setup
        if (!this.git || this.git.repositories.length === 0) {
            this.postInfo(null, null);

            return;
        }

        const { activeTextEditor } = window;

        // no editor is open currently, repository information is useless without this
        console.log("activeTextEditor: ", activeTextEditor);
        if (!activeTextEditor) {
            console.log("Entered no activeTextEditor case.");
            // can naively set current opened repo to null as well
            this.postInfo(null, null);

            return;
        }

        const {
            document: { fileName },
        } = activeTextEditor;

        let selectedRepositories = this.git.repositories.filter(
            (repository) => {
                const { rootUri } = repository;

                return fileName.includes(rootUri.path);
            }
        );

        if (selectedRepositories.length < 1) {
            // no repository correlated with current file
            this.postInfo(null, null);

            return;
        }

        const selectedRepository = selectedRepositories[0];

        const {
            state: { remotes },
        } = selectedRepository;

        if (!remotes || remotes.length === 0) {
            // Handle no remote by posting null, null
            this.postInfo(null, null);

            return;
        }

        // only use first remote for now
        const { fetchUrl } = remotes[0];

        if (!fetchUrl) {
            this.postInfo(null, null);

            return;
        }

        const repositoryFullName = this.extractFullName(fetchUrl);

        const { rootUri } = selectedRepository;

        const activeFilePath = fileName.slice(rootUri.path.length + 1);

        console.log("Posting Info:", {
            repositoryFullName,
            activeFilePath,
        });
        this.postInfo(repositoryFullName, activeFilePath);
    }

    postInfo(repositoryFullName?: string, activeFilePath?: string) {
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
