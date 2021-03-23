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
            loaded: false,
        };
    }

    componentDidMount() {
        this.setState({
            loaded: true,
        });
    }

    renderListItems = () => {
        const { data, model, source } = this.props;

        console.log("These are the parameters we can see", {
            data,
            model,
            source,
        });

        const listItems = data.map((item) => {
            return (
                <ContextListItem
                    key={item.name}
                    model={model}
                    source={source}
                    name={item.name}
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

    max-height: 23rem;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    padding-bottom: 1rem;
`;
