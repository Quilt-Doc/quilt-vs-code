import React, { useMemo, useRef, useState } from "react";

//styles
import styled from "styled-components";
import chroma from "chroma-js";

//icons
import { ImGithub } from "react-icons/im";
import { AiOutlineRedo } from "react-icons/ai";

//pusher
import Pusher from "pusher-js";

//vscode api
import vscode from "../../vscode/vscode";

//react-redux
import { connect } from "react-redux";

//containers
import { Panel, Logo, SubHeader } from "../../elements";
import LoginButton from "./LoginButton";

//constants
import { API_ENDPOINT } from "../../constants/constants";
import { OPEN_BROWSER } from "../../vscode/types/messageTypes";

//actions
import { authenticateUser, encryptAuthToken } from "../../actions/AuthActions";

const Login = ({ authenticateUser, encryptAuthToken, history }) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const [requestTimeout, setRequestTimeout] = useState(null);

    const [requestChannelName, setChannelName] = useState(null);

    const pusher = useMemo(
        () =>
            new Pusher("8a6c058f2c0eb1d4d237", {
                cluster: "mt1",
                authEndpoint: `${API_ENDPOINT}/pusher/vscode/auth`,
            }),
        []
    );

    const renewLogin = useMemo(
        () => () => {
            if (requestChannelName) {
                pusher.unsubscribe(requestChannelName);

                setChannelName(null);
            }

            if (requestTimeout) {
                clearTimeout(requestTimeout);

                setRequestTimeout(null);
            }

            setIsLoggingIn(false);

            console.log(
                "Please reload authentication or reclick to authenticate."
            );
        },
        [isLoggingIn, requestTimeout, requestChannelName]
    );

    const tryLogin = useMemo(
        () => async () => {
            const { ideToken, encryptedToken } = await encryptAuthToken();

            const channelName = `private-${ideToken}`;

            console.log("channelName: ", channelName);
            console.log(`ideToken: ${ideToken}, encryptedToken: ${encryptedToken}`);

            const tokenListener = pusher.subscribe(channelName);

            setChannelName(channelName);

            const timeout = setTimeout(() => {
                console.log(
                    "Request timed out.. Please reload authentication or reclick to authenticate."
                );

                pusher.unsubscribe(channelName);

                setChannelName(null);

                setRequestTimeout(null);

                setIsLoggingIn(false);
            }, 150000);

            setRequestTimeout(timeout);

            setIsLoggingIn(true);

            tokenListener.bind("pusher:subscription_succeeded", () => {
                console.log("OPEN BROWSER: ");
                console.log(`${API_ENDPOINT}/auth/github?ide_token=${encodeURIComponent(encryptedToken)}`);
                vscode.postMessage({
                    type: OPEN_BROWSER,
                    payload: {
                        url: `${API_ENDPOINT}/auth/github?ide_token=${encodeURIComponent(
                            encryptedToken
                        )}`,
                    },
                });

                tokenListener.bind(
                    "vscode-user-authorized",
                    ({ jwt, user, isAuthorized }) => {
                        if (isAuthorized && user) {
                            pusher.unsubscribe(channelName);

                            clearTimeout(timeout);

                            console.log("\n user is being authenticated", {
                                jwt,
                                user,
                                isAuthorized,
                            });

                            authenticateUser({ jwt, user, isAuthorized });

                            const { isOnboarded, workspaces } = user;

                            if (!isOnboarded) return history.push("/onboard");

                            if (workspaces.length == 0) {
                                return history.push("/create_workspace");
                            }

                            return history.push(
                                `/space/${workspaces[0]._id}/settings/user`
                            );
                        }
                    }
                );
            });

            tokenListener.bind("pusher:subscription_error", () => {
                clearTimeout(timeout);

                pusher.unsubscribe(channelName);

                setChannelName(null);

                setRequestTimeout(null);

                setIsLoggingIn(false);

                console.log(
                    "Please reload authentication or reclick to authenticate."
                );
            });
        },
        [authenticateUser, isLoggingIn, requestTimeout, requestChannelName]
    );

    return (
        <LoginBackground>
            <LoginContainer>
                <Logo />
                <BrandName>quilt</BrandName>
                <LoginButton loading={isLoggingIn} onClick={tryLogin}>
                    <ImGithub
                        style={{
                            marginRight: "1.1rem",
                            fontSize: "1.6rem",
                        }}
                    />
                    Continue with Github
                </LoginButton>
                {isLoggingIn && (
                    <RedoButton onClick={renewLogin}>
                        <AiOutlineRedo style={{ marginRight: "0.4rem" }} />
                        <SubHeader>Retry Login</SubHeader>
                    </RedoButton>
                )}
            </LoginContainer>
        </LoginBackground>
    );
};

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps, { authenticateUser, encryptAuthToken })(
    Login
);

const RedoButton = styled.div`
    display: flex;

    align-items: center;

    margin-top: 1rem;

    cursor: pointer;

    opacity: 0.7;

    &:hover {
        opacity: 1;
    }
`;

const BrandName = styled.div`
    font-size: 3rem;

    letter-spacing: 1px;

    font-weight: 400;

    margin-bottom: 5rem;

    margin-top: -1.2rem;
`;

const LoginBackground = styled.div`
    display: flex;

    padding: 2rem 0rem;
`;

const LoginContainer = styled(Panel)`
    padding: 2rem 2rem;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    height: 30rem;
`;

/*
const LoginButton = styled.div`
    background-color: ${chroma("#090B10").set("hsl.l", "+0.05")};
    height: 4rem;
    display: inline-flex;
    border-radius: 0.3rem;
   
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
`;*/
