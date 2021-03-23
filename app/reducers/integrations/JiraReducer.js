import { POPULATE_JIRA_CONTEXT } from "../actions/types/JiraTypes";

import { populateIntegration } from "./helpers";

const INITIAL_STATE = {
    boards: {},
    tickets: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POPULATE_JIRA_CONTEXT:
            const { payload } = action;

            const fileContextKeys = ["tickets"];

            return populateIntegration(payload, state, fileContextKeys);

        default:
            return state;
    }
};
