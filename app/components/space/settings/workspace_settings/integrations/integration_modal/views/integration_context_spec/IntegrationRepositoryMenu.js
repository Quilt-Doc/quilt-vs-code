import React, { Component } from "react";

//styles
import styled from "styled-components";

//elements
import { SubHeader, IntegrationItem } from "../../../../../../../../elements";

//components
import { Menu } from "../../../../../../../../elements";

//icons
import { CgMathPlus } from "react-icons/cg";

//redux
import { connect } from "react-redux";

class IntegrationRepositoryMenu extends Component {
    renderFullName = (name) => {
        let split = name.split("/");

        if (split.length == 2) {
            return `${split[0]} / ${split[1]}`;
        } else {
            const username = split.shift();

            return `${username} / ${split.join("/")}`;
        }
    };

    renderRepositoryMenu = () => {
        const { repositories, selectedValues, selectValue } = this.props;

        const count = Array.from(selectedValues).length;

        const generateRepositoryButton = (menuContainer) => {
            return (
                <RepositoryButton>
                    <Plus>
                        <CgMathPlus />
                    </Plus>
                    <SubHeader>Add Repositories</SubHeader>
                    <Count>{count}</Count>
                    {menuContainer}
                </RepositoryButton>
            );
        };

        const listItems = repositories.map((repo, i) => {
            const { _id, fullName } = repo;

            return (
                <IntegrationItem
                    key={_id}
                    type={"github"}
                    name={this.renderFullName(fullName)}
                    marginBottom={i === repositories.length - 1 ? "0rem" : null}
                />
            );
        });

        const values = repositories.map((repo) => repo._id);

        return (
            <Menu
                multi={true}
                generateMenuButton={generateRepositoryButton}
                listItems={listItems}
                values={values}
                selectedValues={selectedValues}
                title={`Link Relevant Repositories`}
                listItemOnClick={(id) => {
                    selectValue(id);
                }}
            />
        );
    };

    render() {
        return this.renderRepositoryMenu();
    }
}

const mapStateToProps = (state) => {
    const { repositories } = state;

    return {
        repositories: Object.values(repositories),
    };
};

export default connect(mapStateToProps, {})(IntegrationRepositoryMenu);

const Count = styled.div`
    border-radius: 50%;

    display: flex;

    align-items: center;

    justify-content: center;

    width: 2.1rem;

    height: 2.1rem;

    margin-left: auto;

    font-size: 1rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_2};
`;

const Plus = styled.div`
    display: flex;

    align-items: center;

    font-size: 1.3rem;

    margin-right: 0.6rem;

    opacity: 0.8;
`;

const RepositoryButton = styled.div`
    display: inline-flex;

    height: 3.2rem;

    font-weight: 500;

    font-size: 1.3rem;

    align-items: center;

    /*justify-content: center;*/

    padding: 0rem 1rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    /*border: 1px solid #6762df;*/

    border-radius: 0.4rem;

    cursor: pointer;

    width: 100%;

    margin-top: 0.8rem;

    position: relative;
`;
