import React, { Component } from "react";
import PropTypes from "prop-types";

//styles
import styled from "styled-components";
import chroma from "chroma-js";

//components
import { SubHeader } from "../../../../elements";

//icons
import { RiTrelloFill } from "react-icons/ri";
import { VscGithubInverted, VscOpenPreview } from "react-icons/vsc";

class DetailCardStatus extends Component {
    renderFullName = (name) => {
        let split = name.split("/");

        if (split.length == 2) {
            return `${split[0]} / ${split[1]}`;
        } else {
            const username = split.shift();

            return `${username} / ${split.join("/")}`;
        }
    };

    renderStatus = () => {
        const { elem, kind } = this.props;

        const { reviewDecision, state, repository, board, column } = elem;

        let icon;

        let status;

        let sourceObjName = this.renderFullName(repository.fullName);

        let statusColor;

        switch (kind) {
            case "pullRequest":
                icon = (
                    <VscGithubInverted
                        style={{
                            marginRight: "0.6rem",
                            fontSize: "1.7rem",
                        }}
                    />
                );

                status =
                    reviewDecision == "REVIEW_REQUIRED"
                        ? "Review Required"
                        : reviewDecision == "CHANGES_REQUESTED"
                        ? "Changes Requested"
                        : "Approved";

                break;
            case "commit":
                icon = (
                    <VscGithubInverted
                        style={{
                            marginRight: "0.8rem",
                            fontSize: "1.7rem",
                        }}
                    />
                );

                break;
            case "document":
                sourceObjName = elem.drive.name;

                break;
            case "ticket":
                statusColor = "#58a5ff";

                if (elem.source == "trello") {
                    icon = (
                        <RiTrelloFill
                            style={{
                                marginRight: "0.7rem",
                                fontSize: "1.9rem",
                            }}
                        />
                    );

                    status = column.name;

                    sourceObjName = board.name;
                } else if (elem.source == "jira") {
                    icon = (
                        <RiTrelloFill
                            style={{
                                marginRight: "0.7rem",
                                fontSize: "1.9rem",
                            }}
                        />
                    );

                    status = column.name;

                    sourceObjName = board.name;
                } else if (elem.source == "github") {
                    icon = (
                        <VscGithubInverted
                            style={{
                                marginRight: "0.6rem",
                                fontSize: "1.7rem",
                            }}
                        />
                    );

                    status = state == "OPEN" ? "Open" : "Closed";
                }

                break;
            default:
                return;
        }

        return (
            <DetailCardItem>
                <DetailCardIcon op={0.8} size={"1.9rem"}>
                    <VscOpenPreview />
                </DetailCardIcon>
                <DetailSourceObj>
                    {icon}
                    <OpaqueSubHeader noWrap={true}>{sourceObjName}</OpaqueSubHeader>
                </DetailSourceObj>
                {status && (
                    <DetailContent>
                        <DetailStatus color={statusColor}>
                            <OpaqueSubHeader noWrap={true}>{status}</OpaqueSubHeader>
                        </DetailStatus>
                    </DetailContent>
                )}
            </DetailCardItem>
        );
    };

    render() {
        return this.renderStatus();
    }
}

export default DetailCardStatus;

DetailCardStatus.propTypes = {
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

const DetailStatus = styled.div`
    height: 3rem;

    border-radius: 0.5rem;

    background-color: ${(props) =>
        props.color ? chroma(props.color).alpha(0.2) : chroma("#FC427B").alpha(0.2)};

    color: ${(props) => (props.color ? props.color : "#fc427b")};

    align-items: center;

    padding: 0rem 1.5rem;

    display: inline-flex;
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
