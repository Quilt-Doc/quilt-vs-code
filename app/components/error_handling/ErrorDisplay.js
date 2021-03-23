import React, { Component } from "react";

import styled from "styled-components";

//icons
import { FaRegSadCry } from "react-icons/fa";

//components
import { Modal, Header, SubHeader, Button } from "../../elements";

//router
import { withRouter } from "react-router-dom";

//redux
import { connect } from "react-redux";

//actions
import { logoutUser } from "../../actions/AuthActions";
import { clearError } from "../../actions/ErrorActions";

class ErrorDisplay extends Component {
    reloadPage = () => {
        const { history, location, clearError, resetError } = this.props;

        if (resetError) resetError();

        clearError();

        history.push(location.pathname);
    };

    logoutUser = () => {
        const { logoutUser, history, clearError, resetError } = this.props;

        clearError();

        logoutUser();

        if (resetError) resetError();

        history.push("/login");
    };

    render() {
        const { zIndex } = this.props;

        return (
            <Modal zIndex={zIndex}>
                <Container>
                    <IconContainer>
                        <FaRegSadCry />
                    </IconContainer>
                    <Header>Unfortunately, an error occurred..</Header>
                    <SubHeader>
                        We've been notified about this bug and will be looking
                        into it soon. In the meantime, you can get back to using
                        Quilt by either reloading this page or logging out!
                    </SubHeader>
                    <Button onClick={this.reloadPage}>Reload Page</Button>
                    <Button onClick={this.logoutUser}>Log out</Button>
                </Container>
            </Modal>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

export default withRouter(
    connect(mapStateToProps, { logoutUser, clearError })(ErrorDisplay)
);

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
`;
