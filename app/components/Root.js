import React, { useEffect, useMemo } from "react";

//styles
import styled, { ThemeProvider } from "styled-components";

//components
import Login from "./login/Login";
import Space from "./space/Space";

//actions
import { changeTheme } from "../actions/ThemeActions";
import { setGitInfo } from "../actions/GlobalActions";
//types
import { CHANGE_THEME } from "../actions/types/ThemeTypes";
import { SET_GIT_INFO } from "../actions/types/GlobalTypes";

//redux
import { connect } from "react-redux";

const Root = ({ changeTheme, setGitInfo, theme }) => {
    useEffect(() => {
        window.addEventListener("message", handleExtensionMessage);

        return () =>
            window.removeEventListener("message", handleExtensionMessage);
    }, []);

    const handleExtensionMessage = useMemo(
        () => ({ data: message }) => {
            const { type, payload } = message;

            console.log("MESSAGE", message);

            switch (type) {
                case CHANGE_THEME:
                    changeTheme();
                case SET_GIT_INFO:
                    setGitInfo(payload);
                default:
                    return;
            }
        },
        [changeTheme]
    );

    return (
        <ThemeProvider theme={theme}>
            <Space />
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => {
    const { theme } = state;

    return {
        theme,
    };
};

export default connect(mapStateToProps, { changeTheme, setGitInfo })(Root);
