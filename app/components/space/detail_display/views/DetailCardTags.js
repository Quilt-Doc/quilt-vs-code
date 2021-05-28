import React, { Component } from "react";
import PropTypes from "prop-types";

// components
import { SubHeader } from "../../../../elements";

// styles
import styled from "styled-components";

// icons
import { TiTags } from "react-icons/ti";

class DetailCardTags extends Component {
    renderTags = () => {
        const { elem, kind } = this.props;

        if (kind == "ticket" || kind == "pullRequest") {
            const { labels } = elem;

            let labelContent;

            if (!labels || labels.length == 0) {
                labelContent = (
                    <DetailSourceObj>
                        <PlaceholderText>No labels yet..</PlaceholderText>
                    </DetailSourceObj>
                );
            } else {
                labelContent = labels.map((label) => {
                    const { name /*color*/ } = label;

                    return (
                        <Tag key={name}>
                            <OpaqueSubHeader>{name}</OpaqueSubHeader>
                        </Tag>
                    );
                });
            }
            return (
                <DetailCardItem>
                    <DetailCardIcon op={0.8} size={"2rem"}>
                        <TiTags />
                    </DetailCardIcon>
                    <DetailContent>
                        <DetailTags>{labelContent}</DetailTags>
                    </DetailContent>
                </DetailCardItem>
            );
        } else {
            return null;
        }
    };

    render() {
        return this.renderTags();
    }
}

export default DetailCardTags;

DetailCardTags.propTypes = {
    elem: PropTypes.object,
    kind: PropTypes.string,
};

//TODO: Give Max Length
const DetailSourceObj = styled.div`
    height: 3rem;

    border-radius: 0.5rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    color: white;

    align-items: center;

    padding: 0rem 1.5rem;

    display: inline-flex;

    margin-right: 1rem;
`;

const OpaqueSubHeader = styled(SubHeader)`
    opacity: 1;

    margin-left: ${(props) => props.marginLeft};

    margin-bottom: ${(props) => props.marginBottom};
`;

const PlaceholderText = styled(SubHeader)`
    opacity: 0.9;

    font-style: italic;
`;

const DetailTags = styled.div`
    display: flex;

    flex-wrap: wrap;
`;

const Tag = styled.div`
    border: 1px solid rgb(93, 106, 210, 0.8);

    padding: 0.2rem 0.8rem;

    margin-right: 1rem;

    border-radius: 0.7rem;
`;

const DetailCardItem = styled.div`
    margin-bottom: 1.5rem;

    display: flex;

    align-items: center;
`;

const DetailContent = styled.div``;

const DetailCardIcon = styled.div`
    font-size: ${(props) => (props.size ? props.size : "1.7rem")};

    margin-top: ${(props) => props.top};

    min-width: 2.8rem;

    max-width: 2.8rem;

    opacity: 0.95;

    opacity: ${(props) => props.op};

    display: flex;

    color: ${(props) => (props.color ? props.color : "")};
`;
