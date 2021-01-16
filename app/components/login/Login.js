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

//react-redux
import { connect } from "react-redux";

//containers
import { Panel } from "../../elements";

//constants
import { API_ENDPOINT } from "../../constants/constants";
import { OPEN_BROWSER } from "../../vscode/types/messageTypes";

//actions
import { authenticateUser } from "../../actions/AuthActions";

const Login = ({ authenticateUser, history }) => {
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
            const ideToken = new Date().getTime();

            const channelName = `private-${ideToken}`;

            const tokenListener = pusher.subscribe(channelName);

            const timeout = setTimeout(() => {
                console.log(
                    "Request timed out.. Please reload authentication or reclick to authenticate."
                );

                pusher.unsubscribe(channelName);
            }, 150000);

            tokenListener.bind("pusher:subscription_succeeded", () => {
                vscode.postMessage({
                    type: OPEN_BROWSER,
                    payload: {
                        url: `${API_ENDPOINT}/auth/github?ide_token=${ideToken}`,
                    },
                });

                tokenListener.bind(
                    "vscode-user-authorized",
                    ({ jwt, user, isAuthorized }) => {
                        if (isAuthorized && user) {
                            pusher.unsubscribe(channelName);

                            clearTimeout(timeout);

                            console.log("JWT", jwt);

                            console.log("USER", user);

                            authenticateUser({ jwt, user, isAuthorized });

                            const { isOnboarded, workspaces } = user;

                            if (!isOnboarded) {
                                history.push("/onboard");
                            } else {
                                history.push(
                                    `/space/${
                                        workspaces[workspaces.length - 1]
                                    }`
                                );
                            }
                        }
                    }
                );
            });

            tokenListener.bind("pusher:subscription_error", () => {
                pusher.unsubscribe(channelName);

                clearTimeout(timeout);

                console.log(
                    "Please reload authentication or reclick to authenticate."
                );
            });
        },
        [authenticateUser]
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

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps, { authenticateUser })(Login);

const LoginBackground = styled.div`
    display: flex;

    padding: 2rem 0rem;
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
    font-size: 1.4rem;
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
