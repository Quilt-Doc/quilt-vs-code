import React from "react";

//styles
import styled from "styled-components";

//components
import ContextPanelNavbar from "./ContextPanelNavbar";
import ContextListItem from "./ContextListItem";

//import { Panel } from "../../../../elements/containers";
import { Panel } from "../../../../elements";

const ContextPanel = ({ context, integration }) => {
    const listItems =
        integration == "github"
            ? context["commits"].map((commit) => {
                  return (
                      <ContextListItem
                          integration={integration}
                          name={commit.commitMessage}
                      />
                  );
              })
            : context["tickets"].map((ticket) => {
                  return (
                      <ContextListItem
                          integration={integration}
                          name={ticket.name}
                      />
                  );
              });

    return (
        <ContextPanelContainer>
            <ContextPanelNavbar integration={integration} />
            <ContextPanelList>{listItems}</ContextPanelList>
        </ContextPanelContainer>
    );
};

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
