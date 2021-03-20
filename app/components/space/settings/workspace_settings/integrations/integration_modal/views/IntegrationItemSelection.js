import React, { Component } from "react";

//styles
import styled from "styled-components";

//vscode api
import vscode from "../../../../../../../vscode/vscode";

//react-redux
import { connect } from "react-redux";

//router
import { withRouter } from "react-router-dom";

//actions
import { getExternalTrelloBoards } from "../../../../../../../actions/TrelloActions";
import { getExternalJiraBoards } from "../../../../../../../actions/JiraActions";
import { getExternalGoogleDrives } from "../../../../../../../actions/GoogleActions";

//types
import { OPEN_BROWSER } from "../../../../../../../vscode/types/messageTypes";

//components
import {
    Loader,
    Header,
    IntegrationItem,
    Button,
    SubHeader,
} from "../../../../../../../elements";
import IntegrationRequestInformation from "./IntegrationRequestInformation";

const BASE_URL = "http://localhost:3001/api/integrations/connect";

class IntegrationItemSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            requestInformation: false,
            items: null,
        };

        this.getItems = {
            trello: this.props.getExternalTrelloBoards,
            jira: this.props.getExternalJiraBoards,
            google: this.props.getExternalGoogleDrives,
        };
    }

    componentDidMount() {
        this.pollItems(true);
    }

    pollItems = async (initial) => {
        const {
            integration,
            user: { _id: userId },
            match,
        } = this.props;

        const { workspaceId } = match.params;

        const result = await this.getItems[integration]({
            workspaceId,
            userId,
        });

        if (!result) {
            if (initial) this.handleAuthorization();

            setTimeout(() => this.pollItems(false), 2000);
        } else {
            if (integration == "jira") {
                this.setState({ requestInformation: true, items: result });
            } else {
                this.setState({ loaded: true, items: result });
            }
        }
    };

    handleAuthorization = () => {
        const {
            user: { _id: userId },
            match,
            integration,
        } = this.props;

        const { workspaceId } = match.params;

        vscode.postMessage({
            type: OPEN_BROWSER,
            payload: {
                url: `${BASE_URL}/${integration}?&user_id=${userId}&workspace_id=${workspaceId}`,
            },
        });
    };

    renderLoader = () => {
        return (
            <>
                <Header>Waiting for Authorization...</Header>
                <Loader />
            </>
        );
    };

    handleClick = (item) => {
        const { id } = item;

        const { active, setActive } = this.props;

        let newActive = [...active];

        let activeIds = active.map((item) => item.id);

        if (activeIds.includes(id)) {
            newActive = newActive.filter((item) => item.id !== id);
        } else {
            newActive.push(item);
        }

        setActive(newActive);
    };

    handleButtonClick = () => {
        const { changePage, active } = this.props;

        if (active.length > 0) {
            changePage(2);
        } else {
            console.log("USER MESSAGE: Please select at least one item.");
        }
    };

    renderItems = () => {
        const { items } = this.state;
        const { integration, active } = this.props;

        const activeIds = active.map((activeItem) => activeItem.id);

        const itemsJSX = items.map((item, i) => {
            const { name, id } = item;

            return (
                <IntegrationItem
                    key={`${name}-${i}`}
                    type={integration}
                    name={name}
                    active={activeIds.includes(id)}
                    onClick={() => this.handleClick(item)}
                />
            );
        });

        const sourceObjs = {
            google: "Drives",
            github: "Repositories",
            jira: "Boards",
            trello: "Boards",
        };

        const sourceObjs2 = {
            google: "drives",
            github: "repositories",
            jira: "boards",
            trello: "boards",
        };

        return (
            <>
                <Header>{`Select Relevant ${sourceObjs[integration]}`}</Header>
                <SubHeader>
                    {`Connect related ${sourceObjs2[integration]} to your workspace.`}
                </SubHeader>
                <IntegrationList>{itemsJSX}</IntegrationList>
                <Button marginTop={"2rem"} onClick={this.handleButtonClick}>
                    Continue
                </Button>
            </>
        );
    };

    render() {
        const { loaded, requestInformation } = this.state;

        if (loaded) {
            return this.renderItems();
        } else if (requestInformation) {
            return (
                <IntegrationRequestInformation
                    setLoaded={() => this.setState({ loaded: true })}
                />
            );
        } else {
            return this.renderLoader();
        }
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
        getExternalTrelloBoards,
        getExternalJiraBoards,
        getExternalGoogleDrives,
    })(IntegrationItemSelection)
);

const IntegrationList = styled.div`
    display: flex;

    flex-direction: column;

    margin-top: 2rem;

    width: 100%;

    max-height: 25rem;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;
