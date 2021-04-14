import React, { Component } from "react";

import styled from "styled-components";

//components
import { Modal, Header, SubHeader, Button, Panel } from "../index";

class Alert extends Component {
    renderActions = () => {
        const { actions } = this.props;

        if (!actions || actions.length == 0) return;

        return actions.map((action) => {
            const { func, name } = action;

            return <Button onClick={func}>{name}</Button>;
        });
    };

    renderAlertContent = () => {
        const { icon, header, subheader } = this.props;

        return (
            <Container>
                {icon ? <IconContainer>{icon}</IconContainer> : null}
                <Header>{header}</Header>
                <SubHeader>{subheader}</SubHeader>
                {/*this.renderActions()*/}
            </Container>
        );
    };

    renderAlert = () => {
        const { isPanel, closeModal } = this.props;

        const content = this.renderAlertContent();

        return isPanel ? (
            <Panel>{content}</Panel>
        ) : (
            <Modal closeModal={closeModal}>{content}</Modal>
        );
    };

    render() {
        return this.renderAlert();
    }
}

export default Alert;

const IconContainer = styled.div`
    height: 12rem;

    width: 100%;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 5rem;
`;

const Container = styled.div`
    padding: 2rem 2.2rem;

    padding-bottom: 3rem;

    display: flex;

    flex-direction: column;

    text-align: center;
`;
