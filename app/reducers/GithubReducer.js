import {
    CHECK_GITHUB_INSTALLATIONS,
    RETRIEVE_GITHUB_REPOSITORIES,
    UPDATE_GITHUB_FILE_CONTEXT,
} from "../actions/types/GithubTypes";

const INITIAL_STATE = {
    installations: [],
    repositories: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECK_GITHUB_INSTALLATIONS:
            return { ...state, installations: action.payload };
        case UPDATE_GITHUB_FILE_CONTEXT:
            return { ...state, ...action.payload };
        case RETRIEVE_GITHUB_REPOSITORIES:
            return { ...state, repositories: action.payload };
        default:
            return state;
    }
};
