import { motion } from "framer-motion";
import { styled } from "styled-components";

export const Wrapper = styled.div`
    background-color: ${(props) => props.theme.black.deepDark};
    width: 100%;
    height: 300vh;
`;

export const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Info = styled(motion.div)`
    padding: 10px;
    color: ${(props) => props.theme.white.darker};
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    box-sizing: border-box;
    h4 {
        text-align: center;
        font-size: 18px;
    }
`;

export const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.2,
            type: "tween",
        },
    },
};

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

export const SubTitle = styled.div`
    color: ${(props) => props.theme.white.lighter};
    width: 300px;
    height: 50px;
    position: absolute;
    top: -50px;
    font-weight: 400;
    font-size: 28px;
`;

export const LeftSlideButton = styled(motion.div)`
    position: absolute;
    left: -45px;
    top: 65px;
    z-index: 99;
    &:hover {
        cursor: pointer;
        scale: 1.1;
    }
`;

export const RightSlideButton = styled(motion.div)`
    position: absolute;
    right: -45px;
    top: 65px;
    z-index: 99;
    &:hover {
        cursor: pointer;
        scale: 1.1;
    }
`;

export const Row = styled(motion.div)`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
    box-sizing: border-box;
`;

export const Box = styled(motion.div)<{ bgPhoto: string }>`
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    height: 165px;
    font-size: 60px;
    color: black;
    border-radius: 3px;

    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

export const rowVariants = {
    hidden: (slideDir: number) => ({
        x: window.outerWidth * slideDir + 5,
    }),
    visible: {
        x: 0,
    },
    exit: (slideDir: number) => ({
        x: -window.outerWidth * slideDir - 5,
    }),
};

export const Slider = styled.div`
    position: relative;
    top: -190px;
    margin-left: 60px;
    margin-right: 60px;
`;

export const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        cursor: "pointer",
        zIndex: 99,
        y: -60,
        scale: 1.3,
        transition: {
            delay: 0.5,
            duration: 0.2,
            type: "tween",
        },
    },
};
