import {
    CHECK_GITHUB_INSTALLATIONS,
    RETRIEVE_GITHUB_REPOSITORIES,
} from "../actions/types/GithubTypes";

const INITIAL_STATE = {
    installations: [],
    repositories: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECK_GITHUB_INSTALLATIONS:
            console.log("ABOUT TO BE", {
                ...state,
                installations: action.payload,
            });
            return { ...state, installations: action.payload };
        case RETRIEVE_GITHUB_REPOSITORIES:
            return { ...state, repositories: action.payload };
        default:
            return state;
    }
};
