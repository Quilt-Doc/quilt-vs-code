import React from "react";

import styled from "styled-components";

import logoSVG from "../../images/colored_logo.svg";

const Logo = () => {
    return (
        <LogoContainer>
            <LogoIconContainer>
                <LogoImage src={logoSVG} />
            </LogoIconContainer>
        </LogoContainer>
    );
};

export default Logo;

const LogoImage = styled.img`
    width: 3.2rem;
`;

const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 3rem;
`;

const LogoIconContainer = styled.div`
    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};
    height: 6rem;
    width: 6rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
