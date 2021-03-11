//react
import React, { Component } from "react";

//styles
import styled from "styled-components";

//containers
import { Panel, Logo, Loader } from "../../elements";

class LoadingScreen extends Component {
    render() {
        return (
            <Background>
                <Container>
                    <Logo />
                    <BrandName>quilt</BrandName>
                    <Loader />
                </Container>
            </Background>
        );
    }
}

export default LoadingScreen;

const BrandName = styled.div`
    font-size: 3rem;

    letter-spacing: 1px;

    font-weight: 400;

    margin-bottom: 5rem;

    margin-top: -1.2rem;
`;

const Background = styled.div`
    display: flex;

    padding: 2rem 0rem;
`;

const Container = styled(Panel)`
    padding: 2rem 2rem;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    height: 30rem;
`;
