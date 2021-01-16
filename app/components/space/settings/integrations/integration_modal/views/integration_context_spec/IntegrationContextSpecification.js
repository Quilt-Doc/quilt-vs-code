import React, { Component } from "react";

//styles
import styled from "styled-components";

//elements
import {
    Header,
    IntegrationItem,
    SubHeader,
    Button,
} from "../../../../../../../elements";

//components
import IntegrationListMenu from "./IntegrationListMenu";
import IntegrationRepositoryMenu from "./IntegrationRepositoryMenu";

//icons
import { HiArrowNarrowRight } from "react-icons/hi";

//constants
import { START_TYPE, END_TYPE } from "../../../../../../../constants/constants";

//actions
import { triggerTrelloScrape } from "../../../../../../../actions/TrelloActions";
import { generateAssociations } from "../../../../../../../actions/AssociationActions";

//router
import { withRouter } from "react-router-dom";

//react-redux
import { connect } from "react-redux";

class IntegrationContextSpecification extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    acquireListId = (boardId, type) => {
        const board = this.state[boardId];

        if (board) {
            return board[type];
        } else {
            return null;
        }
    };

    selectList = (boardId, type, value) => {
        let board = this.state[boardId] ? this.state[boardId] : {};

        board = { ...board, [type]: value };

        this.setState({ [boardId]: board });
    };

    renderActivitySpec = (item) => {
        const { id: boardId } = item;

        const startValue = this.acquireListId(boardId, START_TYPE);

        const endValue = this.acquireListId(boardId, END_TYPE);

        const selectListGen = (type) => (value) => {
            this.selectList(boardId, type, value);
        };

        return (
            <Specification>
                <SubHeader>List Activity</SubHeader>
                <ActivityContainer>
                    <IntegrationListMenu
                        board={item}
                        type={START_TYPE}
                        value={startValue}
                        selectValue={selectListGen(START_TYPE)}
                    />
                    <Arrow>
                        <HiArrowNarrowRight />
                    </Arrow>
                    <IntegrationListMenu
                        board={item}
                        type={END_TYPE}
                        value={endValue}
                        selectValue={selectListGen(END_TYPE)}
                    />
                </ActivityContainer>
            </Specification>
        );
    };

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
                    <Data>
                        {this.renderActivitySpec(item)}
                        {this.renderRepositorySpec(item)}
                    </Data>
                </Block>
            );
        });
    };

    handleContinueClick = async () => {
        const {
            user: { _id: userId },
            active,
            match,
            triggerTrelloScrape,
            generateAssociations,
        } = this.props;

        const { workspaceId } = match.params;

        let contexts = [];

        for (let i = 0; i < active.length; i++) {
            const item = active[i];

            const { id, lists } = item;

            const board = this.state[id];

            if (!board) return;

            const { repositories } = board;

            if (!repositories) return;

            if (lists && lists.length >= 2) {
                if (!board[START_TYPE] || !board[END_TYPE]) return;
            }

            const beginListId = board[START_TYPE];

            const endListId = board[END_TYPE];

            const event =
                beginListId && endListId ? { beginListId, endListId } : null;

            const context = {
                board: id,
                repositories: Array.from(repositories),
                event,
            };

            contexts.push(context);
        }

        contexts = await triggerTrelloScrape({
            userId,
            workspaceId,
            contexts,
        });

        console.log("CONTEXTS", contexts);

        console.log("ABOUT TO GENERATE ASSOCS");

        const associations = await generateAssociations({
            workspaceId,
            contexts,
        });

        console.log("GENERATED ASSOCIATIONS", associations);
    };

    render() {
        return (
            <>
                <Header>Provide Additional Data</Header>
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
    connect(mapStateToProps, { triggerTrelloScrape, generateAssociations })(
        IntegrationContextSpecification
    )
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
`;

const VerticalList = styled.div`
    display: flex;

    flex-direction: column;
`;
