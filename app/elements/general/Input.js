import React from "react";
import styled from "styled-components";

import SubHeader from "../typography/SubHeader";

const Input = ({
    label,
    setRef,
    placeholder,
    defaultValue,
    autoFocus,
    spellCheck,
}) => {
    return (
        <InputContainer>
            <InputLabel>{label}</InputLabel>
            <InputField
                ref={setRef}
                spellCheck={spellCheck}
                autoFocus={autoFocus}
                placeholder={placeholder}
                defaultValue={defaultValue}
            />
        </InputContainer>
    );
};

export default Input;

const InputContainer = styled.div`
    margin-top: 1.5rem;

    &:first-of-type {
        margin-top: 2rem;
    }
`;

const InputLabel = styled(SubHeader)`
    margin-bottom: 0.4rem;
`;

const InputField = styled.input`
    width: 100%;

    font-size: 1.2rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    outline: none;

    border: 2px solid transparent;

    font-weight: 500;

    padding: 1rem 1.2rem;

    border-radius: 0.4rem;

    color: ${(props) => props.theme.TEXT_COLOR};

    &:focus {
        border: 1px solid ${(props) => props.theme.SECONDARY_COLOR};

        outline: none;
    }

    &::placeholder {
        color: ${(props) => props.theme.TEXT_COLOR};

        font-weight: 500;

        opacity: 0.4;
    }
`;
