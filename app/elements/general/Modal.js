import React from "react";
import styled from "styled-components";

const Modal = (props) => {
    const { closeModal, children, contentHeight, zIndex } = props;
    return (
        <ModalBackground zIndex={zIndex} onClick={closeModal}>
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

export default Modal;

const ModalBackground = styled.div`
    position: fixed; /* Stay in place */

    z-index: ${(props) =>
        props.zIndex ? props.zIndex : 10000}; /* Sit on top */

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

    border-radius: 1rem;

    /*box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
        rgba(15, 15, 15, 0.1) 0px 5px 10px, rgba(15, 15, 15, 0.2) 0px 15px 40px;*/
    /*box-shadow: ${(props) => props.theme.BOX_SHADOW_MENU}*/

    display: flex;

    flex-direction: column;

    max-width: 95rem;

    box-shadow: rgba(0, 0, 0, 0.5) 0px 16px 70px 0px;

    border: 1px solid ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};
`;
