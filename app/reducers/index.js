import { combineReducers } from "redux";

//model specific
import workspaceReducer from "./WorkspaceReducer";
import repositoryReducer from "./RepositoryReducer";
import contextReducer from "./ContextReducer";
import workspaceInviteReducer from "./WorkspaceInviteReducer";

//app specific
import themeReducer from "./ThemeReducer";
import globalReducer from "./GlobalReducer";
import authReducer from "./AuthReducer";

//integration specific
import githubReducer from "./GithubReducer";

//view specific
import blameReducer from "./BlameReducer";

//utility specific
import errorReducer from "./ErrorReducer";

export default combineReducers({
    workspaces: workspaceReducer,
    repositories: repositoryReducer,
    workspaceInvites: workspaceInviteReducer,
    blames: blameReducer,
    context: contextReducer,

    theme: themeReducer,
    global: globalReducer,
    auth: authReducer,
    errors: errorReducer,

    github: githubReducer,
});
