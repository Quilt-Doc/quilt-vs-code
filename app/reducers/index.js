import { combineReducers } from "redux";

import themeReducer from "./ThemeReducer";
import globalReducer from "./GlobalReducer";

export default combineReducers({
    theme: themeReducer,
    global: globalReducer,
});
