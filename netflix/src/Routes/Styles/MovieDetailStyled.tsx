import { motion } from "framer-motion";
import { styled } from "styled-components";

export const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const BigMovie = styled(motion.div)`
    position: absolute;
    width: 40vw;
    height: 80vh;
    background-color: ${(props) => props.theme.black.lighter};
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 15px;
    overflow: hidden;
`;

export const BigCover = styled.div`
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center center;
`;

export const BigTitle = styled.h3`
    color: ${(props) => props.theme.white.lighter};
    font-size: 28px;
    padding: 20px;
    position: relative;
    top: -60px;
`;

export const BigOverview = styled.p`
    color: ${(props) => props.theme.white.lighter};
    padding: 20px;
    position: relative;
    top: -60px;
`;
