import React, { Component } from "react";

//styles
import styled from "styled-components";

//components
import {
    Panel,
    Header,
    SubHeader,
    IntegrationItem,
} from "../../../../../elements";

import IntegrationModal from "./integration_modal/IntegrationModal";

//icons
import { CgMathPlus } from "react-icons/cg";

import { connect } from "react-redux";

class IntegrationPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        };
    }

    renderFullName = (name) => {
        let split = name.split("/");

        if (split.length == 2) {
            return `${split[0]} / ${split[1]}`;
        } else {
            const username = split.shift();

            return `${username} / ${split.join("/")}`;
        }
    };

    renderRepositories = () => {
        const { repositories } = this.props;

        return (
            <IntegrationTypeBlock>
                <SubHeader marginBottom={"0.8rem"}>Repositories</SubHeader>
                {repositories.map((repo) => {
                    const { fullName, _id } = repo;

                    return (
                        <IntegrationItem
                            key={_id}
                            type={"github"}
                            name={this.renderFullName(fullName)}
                        />
                    );
                })}
            </IntegrationTypeBlock>
        );
    };

    renderBoards = () => {
        const { contexts } = this.props;

        if (contexts && contexts.length > 0) {
            return (
                <IntegrationTypeBlock>
                    <SubHeader marginBottom={"0.8rem"}>Boards</SubHeader>
                    {contexts.map((context) => {
                        const {
                            board: { name, source },
                        } = context;

                        return <IntegrationItem type={source} name={name} />;
                    })}
                </IntegrationTypeBlock>
            );
        }
    };

    render() {
        const { isModalOpen } = this.state;

        return (
            <>
                <IntegrationPanelContainer>
                    <IntegrationPanelNavbar>
                        <Header>Integrations</Header>
                        <IntegrationPanelAddButton
                            onClick={() => {
                                this.setState({ isModalOpen: true });
                            }}
                        >
                            <CgMathPlus />
                        </IntegrationPanelAddButton>
                    </IntegrationPanelNavbar>
                    <SubHeader>
                        Integrate with version control, project management, and
                        documentation.
                    </SubHeader>
                    {this.renderRepositories()}
                    {this.renderBoards()}
                </IntegrationPanelContainer>
                {isModalOpen && (
                    <IntegrationModal
                        closeModal={() => this.setState({ isModalOpen: false })}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contexts: Object.values(state.context),
        repositories: Object.values(state.repositories),
    };
};

export default connect(mapStateToProps, {})(IntegrationPanel);

const IntegrationPanelAddButton = styled.div`
    height: 3rem;

    width: 3rem;

    display: flex;

    align-items: center;

    justify-content: center;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    /*margin-left: auto;*/

    position: absolute;

    right: 0;

    top: -29%;

    font-size: 1.55rem;

    border-radius: 0.4rem;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};

    &:hover {
        background-color: ${(props) => props.theme.HOVER_COLOR};
    }

    cursor: pointer;
`;

const IntegrationPanelNavbar = styled.div`
    display: flex;

    position: relative;
    /*align-items: center;*/
`;

const IntegrationTypeBlock = styled.div`
    margin-top: 1.65rem;

    /*
    &:last-of-type {
        margin-bottom: 0rem;
    }*/
`;

const IntegrationPanelContainer = styled(Panel)`
    margin-top: 1.5rem;

    padding: 2rem 2rem;
`;
