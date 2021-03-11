import React, { Component } from "react";

import { SubHeader } from "../index";

import styled from "styled-components";

const Step = ({ number, detail, marginTop }) => {
    return (
        <StepContainer marginTop={marginTop}>
            <NumberContainer>
                <SubHeader>{`${number}.`}</SubHeader>
            </NumberContainer>
            <DetailContainer>{detail}</DetailContainer>
        </StepContainer>
    );
};

export default Step;

const StepContainer = styled.div`
    display: flex;

    margin-top: ${(props) => props.marginTop};
`;

const NumberContainer = styled.div`
    min-width: 2.3rem;
`;

const DetailContainer = styled.div``;
