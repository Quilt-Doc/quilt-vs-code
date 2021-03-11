import React, { Component } from "react";

//styles
import styled from "styled-components";

//components
import ContextPanelNavbar from "./ContextPanelNavbar";
import ContextListItem from "./ContextListItem";
import { Panel } from "../../../../elements";

class ContextPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedModel: null,
            loaded: false,
        };
    }

    componentDidMount() {
        const { data } = this.props;

        this.setState({
            selectedModel: Object.keys(data)[0],
            loaded: true,
        });
    }

    renderListItems = () => {
        const { data } = this.props;

        const { selectedModel } = this.state;

        const tempMap = {
            commit: "commitMessage",
            ticket: "name",
            pullRequest: "name",
            branch: "name",
        };

        const nameField = tempMap[selectedModel];

        const listItems = Object.values(data[selectedModel]).map((item) => {
            return (
                <ContextListItem
                    selectedModel={selectedModel}
                    source={source}
                    name={item[nameField]}
                />
            );
        });

        return listItems;
    };

    render() {
        const { source, data } = this.props;

        return (
            <ContextPanelContainer>
                <ContextPanelNavbar source={source} data={data} />
                <ContextPanelList>{this.renderListItems()}</ContextPanelList>
            </ContextPanelContainer>
        );
    }
}

export default ContextPanel;

//PANEL
const ContextPanelContainer = styled(Panel)`
    margin-top: 1.5rem;
`;

const ContextPanelList = styled.div`
    display: flex;

    flex-direction: column;

    max-height: 20rem;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    padding-bottom: 1rem;
`;
