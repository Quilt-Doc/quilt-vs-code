import { CHANGE_THEME } from "../actions/types/ThemeTypes";

import { DARK_BOX_SHADOW_1 } from "../styles/shadows";

import chroma from "chroma-js";

const computeAccentColor = () => {
    const primaryColor = getComputedStyle(document.body).getPropertyValue(
        "--vscode-activityBar-background"
    );

    const accentColor = getComputedStyle(document.body).getPropertyValue(
        "--vscode-editor-background"
    );

    if (primaryColor === accentColor) {
        return chroma(primaryColor).set("hsl.l", "+0.02");
    }

    return accentColor;
};

const INITIAL_STATE = {
    PRIMARY_COLOR: getComputedStyle(document.body).getPropertyValue(
        "--vscode-activityBar-background" //VSCODE_BACKGROUND_COLOR
    ),

    PRIMARY_ACCENT_COLOR: computeAccentColor(), //VSCODE_EDITOR_BACKGROUND_COLOR

    PRIMARY_ACCENT_COLOR_SHADE_1: chroma(computeAccentColor()).set(
        "hsl.l",
        "+0.1"
    ),

    HOVER_COLOR: chroma(computeAccentColor()).set("hsl.l", "+0.05"),

    SECONDARY_COLOR: getComputedStyle(document.body).getPropertyValue(
        "--vscode-activityBarBadge-background" //VSCODE_BORDER_COLOR
    ),

    IS_DARK_THEME:
        getComputedStyle(document.body).color === "rgb(255, 255, 255)",

    TEXT_COLOR: getComputedStyle(document.body).color,

    BOX_SHADOW_1: DARK_BOX_SHADOW_1,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            const isDarkTheme =
                getComputedStyle(document.body).color === "rgb(255, 255, 255)";

            return {
                PRIMARY_COLOR: getComputedStyle(document.body).getPropertyValue(
                    "--vscode-activityBar-background"
                ),

                PRIMARY_ACCENT_COLOR: computeAccentColor(),

                PRIMARY_ACCENT_COLOR_SHADE_1: chroma(computeAccentColor()).set(
                    "hsl.l",
                    "+0.1"
                ),

                SECONDARY_COLOR: getComputedStyle(
                    document.body
                ).getPropertyValue("--vscode-activityBarBadge-background"),

                IS_DARK_THEME: isDarkTheme,

                TEXT_COLOR: getComputedStyle(document.body).color,

                BOX_SHADOW_1: DARK_BOX_SHADOW_1,
            };

        default:
            return state;
    }
};
