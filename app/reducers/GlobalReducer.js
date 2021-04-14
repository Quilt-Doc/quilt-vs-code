import { SET_GIT_INFO } from "../actions/types/GlobalTypes";

const INITIAL_STATE = {
    repositoryFullName: null,
    activeFilePath: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_GIT_INFO:
            console.log("ACTION PAYLOAD HERE", action.payload);
            return action.payload;
        default:
            return state;
    }
};
