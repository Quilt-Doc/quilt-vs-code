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
import trelloReducer from "./TrelloReducer";
import jiraReducer from "./JiraReducer";

//view specific
import blameReducer from "./BlameReducer";

export default combineReducers({
    workspaces: workspaceReducer,
    repositories: repositoryReducer,
    contexts: contextReducer,
    workspaceInvites: workspaceInviteReducer,
    blames: blameReducer,

    theme: themeReducer,
    global: globalReducer,
    auth: authReducer,

    github: githubReducer,
    trello: trelloReducer,
    jira: jiraReducer,
});
