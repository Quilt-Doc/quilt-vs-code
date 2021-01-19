import React, { Component } from "react";

//styles
import styled from "styled-components";

//components
import { Modal } from "../../../../../elements";

//react-router
import { withRouter } from "react-router-dom";

//actions
import IntegrationSourceSelection from "./views/IntegrationSourceSelection";
import IntegrationItemSelection from "./views/IntegrationItemSelection";
import IntegrationContextSpecification from "./views/integration_context_spec/IntegrationContextSpecification";

class IntegrationModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            active: [],
            context: {},
            integration: null,
        };
    }

    changePage = (page) => {
        this.setState({ page });
    };

    renderBody = () => {
        const { integration, context, active, page } = this.state;

        return (
            <>
                {page === 0 && (
                    <IntegrationSourceSelection
                        setIntegration={(newIntegration) => {
                            this.setState({ integration: newIntegration });
                        }}
                        changePage={this.changePage}
                    />
                )}
                {page === 1 && (
                    <IntegrationItemSelection
                        integration={integration}
                        active={active}
                        setActive={(newActive) =>
                            this.setState({ active: newActive })
                        }
                        changePage={this.changePage}
                    />
                )}
                {page === 2 && (
                    <IntegrationContextSpecification
                        integration={integration}
                        active={active}
                        context={context}
                        setContext={(newContext) => {
                            this.setState({ context: newContext });
                        }}
                        changePage={this.changePage}
                    />
                )}
            </>
        );
    };

    render() {
        const { closeModal } = this.props;

        return (
            <Modal closeModal={closeModal}>
                <Container>{this.renderBody()}</Container>
            </Modal>
        );
    }
}

export default withRouter(IntegrationModal);

const Container = styled.div`
    padding: 2rem;

    padding-bottom: 3rem;

    display: flex;

    flex-direction: column;
`;
