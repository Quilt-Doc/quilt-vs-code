import React, { Component } from "react";
import PropTypes from "prop-types";

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
            page: 0,
        };
    }

    componentDidMount() {
        this.setState({
            loaded: true,
        });
    }

    renderListItems = () => {
        let { data, model, source } = this.props;

        const { page } = this.state;

        data = data.slice(page * 4, page * 4 + 4);

        const listItems = data.map((item) => {
            return (
                <ContextListItem
                    key={item.name}
                    model={model}
                    source={source}
                    name={item.name}
                    item={item}
                />
            );
        });

        return listItems;
    };

    changePage = (page) => {
        this.setState({ page });
    };

    render() {
        const { source, model, data } = this.props;

        const { page } = this.state;

        return (
            <ContextPanelContainer>
                <ContextPanelNavbar
                    page={page}
                    changePage={this.changePage}
                    model={model}
                    source={source}
                    data={data}
                />
                <ContextPanelList>{this.renderListItems()}</ContextPanelList>
            </ContextPanelContainer>
        );
    }
}

export default ContextPanel;

ContextPanel.propTypes = {
    // source is the data platform ("github")
    source: PropTypes.string,
    // data are the list items
    data: PropTypes.array,
    // model is the model of the data ("branch")
    model: PropTypes.string,
};

//PANEL
const ContextPanelContainer = styled(Panel)`
    margin-top: 1.5rem;

    padding: 1.5rem;
`;

const ContextPanelList = styled.div`
    display: flex;

    flex-direction: column;

    &::-webkit-scrollbar {
        display: none;
    }
`;
