import { motion } from "framer-motion";
import { styled } from "styled-components";

export const Wrapper = styled.div`
    width: 850px;
    height: 350px;
    /* background-color: rgba(1, 1, 1, 0.5); */
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: -450px;
`;

export const SNS = styled.div`
    width: 50%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    gap: 20px;
    margin-bottom: 5px;
`;

export const Links = styled.div`
    width: 100%;
    height: 100px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    font-size: 12px;
    color: rgba(255, 255, 255, 0.3);

    span {
        max-width: 130px;
    }
    span:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;
