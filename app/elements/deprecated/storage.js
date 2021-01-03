import React from "react";
import styled from "styled-components";

import FormPanel from "../general/FormPanel";

export { FormPanel };

// PANEL COMPONENT
export const Panel = styled.div`
    width: 100%;

    border-radius: 0.7rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};

    /* box-shadow: ${(props) => props.theme.BOX_SHADOW_1};*/
`;

// MODAL COMPONENT
export const Modal = (props) => {
    const { closeModal, children, contentHeight } = props;
    return (
        <ModalBackground onClick={closeModal}>
            {/*<CSSTransition
                in={true}
                appear = {true}
                timeout={300}
                classNames="modal"
            >  */}
            <ModalContent
                height={contentHeight}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </ModalContent>
            {/*</CSSTransition>*/}
        </ModalBackground>
    );
};

const ModalBackground = styled.div`
    position: fixed; /* Stay in place */
    z-index: 10000; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: hidden; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
    overflow-y: scroll;
`;

const ModalContent = styled.div`
    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};
    margin: 3vh auto; /* 15% from the top and centered */
    width: 90vw; /* Could be more or less, depending on screen size */
    min-height: ${(props) => props.contentHeight};
    border-radius: 0.5rem;
    box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
        rgba(15, 15, 15, 0.1) 0px 5px 10px, rgba(15, 15, 15, 0.2) 0px 15px 40px;
    display: flex;
    flex-direction: column;
    max-width: 95rem;
`;

//FORM PANEL COMPONENT
export const FormPanel = ({ children }) => {
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

// FORM COMPONENT
export const Form = styled.div`
    display: flex;

    flex-direction: column;
`;

// FORM INPUT COMPONENT
export const FormInput = ({
    label,
    setRef,
    placeholder,
    defaultValue,
    autoFocus,
    spellCheck,
}) => {
    return (
        <InputContainer key={label}>
            <InputLabel>{label}</InputLabel>
            <Input
                ref={setRef}
                spellCheck={spellCheck}
                autoFocus={autoFocus}
                placeholder={placeholder}
                defaultValue={defaultValue}
            />
        </InputContainer>
    );
};

//BUTTON COMPONENT
export const Button = styled.div`
    display: inline-flex;

    height: 3.5rem;

    font-weight: 500;

    font-size: 1.3rem;

    align-items: center;

    justify-content: center;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    border: 1px solid #6762df;

    border-radius: 0.4rem;

    cursor: pointer;

    margin-top: ${(props) => (props.marginTop ? props.marginTop : "3rem")};
`;
