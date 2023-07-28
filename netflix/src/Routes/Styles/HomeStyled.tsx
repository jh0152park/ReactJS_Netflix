import { motion } from "framer-motion";
import { styled } from "styled-components";

export const Wrapper = styled.div`
    background-color: ${(props) => props.theme.black.deepDark};
    width: 100%;
    height: 200vh;
    position: relative;
`;

export const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CategoryRow = styled.div`
    width: 100%;
    height: 280px;
`;
