import React from "react";
import styled from "styled-components";

import Panel from "./Panel";

const FormPanel = ({ children }) => {
    return (
        <FormPanelBackground>
            <FormPanelContainer>
                <LogoContainer>
                    <LogoIconContainer></LogoIconContainer>
                </LogoContainer>
                {children}
            </FormPanelContainer>
        </FormPanelBackground>
    );
};

export default FormPanel;

const FormPanelBackground = styled.div`
    display: flex;

    padding: 2rem 0rem;
`;

const FormPanelContainer = styled(Panel)`
    display: flex;

    flex-direction: column;

    padding: 2rem 2rem;
`;

const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 3rem;
`;

const Logo = styled.img`
    height: 20rem;
    margin-left: 0.7rem;
`;

const LogoIconContainer = styled.div`
    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};
    height: 6rem;
    width: 6rem;
    border-radius: 0.5rem;
`;
