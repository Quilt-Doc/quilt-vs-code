import { combineReducers } from "redux";

//model specific
import workspaceReducer from "./WorkspaceReducer";
import repositoryReducer from "./RepositoryReducer";

//app specific
import themeReducer from "./ThemeReducer";
import globalReducer from "./GlobalReducer";
import authReducer from "./AuthReducer";

//integration specific
import githubReducer from "./GithubReducer";
import trelloReducer from "./TrelloReducer";

export default combineReducers({
    workspaces: workspaceReducer,
    repositories: repositoryReducer,

    theme: themeReducer,
    global: globalReducer,
    auth: authReducer,

    github: githubReducer,
    trello: trelloReducer,
});
