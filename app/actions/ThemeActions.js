import { CHANGE_THEME } from "./types/ThemeTypes";

export const changeTheme = () => (dispatch) => {
    dispatch({
        type: CHANGE_THEME,
    });
};
