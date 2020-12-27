import React, { useMemo, useRef, useState } from "react";

//styles
import styled from "styled-components";
import chroma from "chroma-js";

//icons
import { ImGithub } from "react-icons/im";

//pusher
import Pusher from "pusher-js";

//vscode api
import vscode from "../../vscode/vscode";

//containers
import { Panel } from "../../elements/containers";

//constants
import { API_ENDPOINT } from "../../constants/constants";

import { OPEN_BROWSER } from "../../vscode/types/messageTypes";

const Login = () => {
    const pusher = useMemo(
        () =>
            new Pusher("8a6c058f2c0eb1d4d237", {
                cluster: "mt1",
                authEndpoint: `${API_ENDPOINT}/pusher/vscode/auth`,
            }),
        []
    );

    const tryLogin = useMemo(
        () => () => {
            console.log("CLICKED");

            const ideToken = new Date().getTime();

            console.log("IDE TOKEN", ideToken);

            const channelName = `private-${ideToken}`;

            console.log("CHANNEL NAME", channelName);

            const tokenListener = pusher.subscribe(channelName);

            tokenListener.bind("pusher:subscription_succeeded", () => {
                console.log("SUBSCRIPTION SUCCEEDED -- ABOUT TO OPEN");

                console.log("VSCODE", vscode);

                vscode.postMessage({
                    command: OPEN_BROWSER,
                    data: {
                        url: `${API_ENDPOINT}/auth/github?ide_token=${ideToken}`,
                    },
                });
                //const vscode = acquireVsCodeApi();

                //console.log("VSCODE", vscode);

                //vscode.env.openExternal(vscode.Uri.parse(url));

                /*
                window.open(
                    `${API_ENDPOINT}/auth/github?ide_token=${ideToken}`,
                    "_self"
                );*/

                tokenListener.bind(
                    "vscode-user-authorized",
                    ({ jwt, user, isAuthorized }) => {
                        if (isAuthorized) {
                            pusher.unsubscribe(channelName);
                            console.log("JWT", jwt);
                            console.log("USER", user);
                            console.log("ISAUTHORIZED", isAuthorized);
                        }
                    }
                );
            });

            tokenListener.bind("pusher:subscription_error", () => {
                pusher.unsubscribe(channelName);

                console.log(
                    "Please reload authentication or reclick to authenticate."
                );
            });

            setTimeout(() => {
                console.log(
                    "Request timed out.. Please reload authentication or reclick to authenticate."
                );

                pusher.unsubscribe(channelName);
            }, 40000);
        },
        []
    );

    return (
        <LoginBackground>
            <LoginContainer>
                <LoginButton onClick={tryLogin}>
                    <ImGithub style={{ marginRight: "1rem" }} />
                    Continue with Github
                </LoginButton>
            </LoginContainer>
        </LoginBackground>
    );
};

export default Login;

const LoginBackground = styled.div`
    display: flex;

    padding: 2rem 0rem;

    color: white;
`;

const LoginContainer = styled(Panel)`
    height: 25rem;

    display: flex;

    align-items: center;

    justify-content: center;
`;

const LoginButton = styled.div`
    background-color: ${chroma("#090B10").set("hsl.l", "+0.05")};
    height: 4rem;
    display: inline-flex;
    border-radius: 0.3rem;
    /* margin-top: 2rem;*/
    font-size: 1.5rem;
    display: inline-flex;
    align-items: center;
    padding-left: 2rem;
    padding-right: 2rem;
    font-weight: 500;
    border: 1px solid #6762df;
    cursor: pointer;
    &:hover {
        background-color: #2e323d;
    }
`;
