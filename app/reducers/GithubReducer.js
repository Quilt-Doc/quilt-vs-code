import {
    CHECK_GITHUB_INSTALLATIONS,
    RETRIEVE_GITHUB_REPOSITORIES,
    POPULATE_GITHUB_CONTEXT,
} from "../actions/types/GithubTypes";

import { populateIntegration } from "./helpers";

const INITIAL_STATE = {
    installations: [],
    repositories: [],
    tickets: {},
    pullRequests: {},
    commits: {},
    branches: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECK_GITHUB_INSTALLATIONS:
            return { ...state, installations: action.payload };

        case POPULATE_GITHUB_CONTEXT:
            const { payload } = action;

            const fileContextKeys = [
                "pullRequests",
                "tickets",
                "commits",
                "branches",
            ];

            return populateIntegration(payload, state, fileContextKeys);

        case RETRIEVE_GITHUB_REPOSITORIES:
            return { ...state, repositories: action.payload };

        default:
            return state;
    }
};
