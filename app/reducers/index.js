import { combineReducers } from "redux";

//model specific
import workspaceReducer from "./WorkspaceReducer";

//app specific
import themeReducer from "./ThemeReducer";
import globalReducer from "./GlobalReducer";
import authReducer from "./AuthReducer";

//integration specific
import githubReducer from "./GithubReducer";

export default combineReducers({
    workspaces: workspaceReducer,

    theme: themeReducer,
    global: globalReducer,
    auth: authReducer,

    github: githubReducer,
});
