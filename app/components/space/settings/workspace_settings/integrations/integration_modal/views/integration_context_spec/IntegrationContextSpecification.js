import React, { Component } from "react";

//styles
import styled from "styled-components";

//elements
import {
    Header,
    IntegrationItem,
    SubHeader,
    Button,
} from "../../../../../../../../elements";

//components
import IntegrationRepositoryMenu from "./IntegrationRepositoryMenu";

//actions
import { triggerTrelloScrape } from "../../../../../../../../actions/TrelloActions";
import { triggerJiraScrape } from "../../../../../../../../actions/JiraActions";
import { generateAssociations } from "../../../../../../../../actions/AssociationActions";

//router
import { withRouter } from "react-router-dom";

//react-redux
import { connect } from "react-redux";

class IntegrationContextSpecification extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.triggerScrape = {
            trello: this.props.triggerTrelloScrape,
            jira: this.props.triggerJiraScrape,
        };
    }

    selectRepository = (boardId, repositoryId) => {
        let board = this.state[boardId];

        board = board ? { ...board } : {};

        let { repositories } = board;

        if (!repositories) repositories = new Set();

        if (repositories.has(repositoryId)) {
            repositories.delete(repositoryId);
        } else {
            repositories.add(repositoryId);
        }

        this.setState({ [boardId]: { ...board, repositories } });
    };

    renderRepositorySpec = (item) => {
        const { id, name } = item;

        const board = this.state[id];

        const selectedRepositories = board
            ? board.repositories
                ? board.repositories
                : new Set()
            : new Set();

        return (
            <Specification>
                <SubHeader>Repositories</SubHeader>
                <IntegrationRepositoryMenu
                    selectedValues={selectedRepositories}
                    selectValue={(repositoryId) =>
                        this.selectRepository(id, repositoryId)
                    }
                />
            </Specification>
        );
    };

    renderBlocks = () => {
        const { active, integration } = this.props;

        return active.map((item) => {
            const { name, id } = item;

            return (
                <Block key={`${name}-${id}`}>
                    <IntegrationItem
                        type={integration}
                        name={name}
                        flat={true}
                        marginBottom={"0rem"}
                    />
                    <Data>{this.renderRepositorySpec(item)}</Data>
                </Block>
            );
        });
    };

    handleContinueClick = async () => {
        const {
            user: { _id: userId },
            active,
            match,
            integration,
            generateAssociations,
        } = this.props;

        const { workspaceId } = match.params;

        let inputs = [];

        for (let i = 0; i < active.length; i++) {
            const item = active[i];

            const { id } = item;

            const board = this.state[id];

            if (!board) return;

            const { repositories } = board;

            if (!repositories) return;

            const input = {
                sourceId: id,
                repositoryIds: Array.from(repositories),
            };

            inputs.push(input);
        }

        const scraped = await this.triggerScrape[integration]({
            workspaceId,
            userId,
            boards: inputs,
        });

        /*
        const associations = await generateAssociations({
            workspaceId,
            boards,
        });

        console.log("ASSOCIATIONS", associations);
        */
    };

    render() {
        return (
            <>
                <Header>Provide Additional Data</Header>
                <SubHeader>
                    {
                        "Link each board to repositories. We'll associate \
                    board data with the relevant parts of your codebase."
                    }
                </SubHeader>
                <VerticalList>{this.renderBlocks()}</VerticalList>
                <Button onClick={this.handleContinueClick}>Continue</Button>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        auth: { user },
    } = state;

    return {
        user,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        triggerTrelloScrape,
        triggerJiraScrape,
        generateAssociations,
    })(IntegrationContextSpecification)
);

const Specification = styled.div`
    &:first-of-type {
        margin-bottom: 1.5rem;
    }
`;

const ActivityContainer = styled.div`
    display: flex;

    margin-top: 0.8rem;
`;

const Arrow = styled.div`
    width: 4rem;

    height: 3.2rem;

    display: flex;

    align-items: center;

    justify-content: center;
`;

const Data = styled.div`
    padding: 1.5rem 1rem;

    padding-bottom: 0.5rem;

    border: 2px solid ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    border-radius: 0.4rem;

    border-top-left-radius: 0rem;

    border-top-right-radius: 0rem;
`;

const Block = styled.div`
    margin-top: 2rem;

    border-radius: 0.4rem;

    &:first-of-type {
        margin-top: 1.5rem;
    }

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};
`;

const VerticalList = styled.div`
    display: flex;

    flex-direction: column;

    margin-top: 1rem;
`;
