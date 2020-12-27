import styled from "styled-components";

import { PRIMARY_COLOR } from "../styles/colors";

import { DARK_BOX_SHADOW_1 } from "../styles/shadows";

import chroma from "chroma-js";

export const Panel = styled.div`
    width: 100%;

    border-radius: 0.7rem;

    background-color: ${chroma("#090B10").set("hsl.l", "+0.02")};

    box-shadow: ${DARK_BOX_SHADOW_1};
`;
