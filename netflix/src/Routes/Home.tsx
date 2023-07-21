import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
    background-color: ${(props) => props.theme.black.deepDark};
    width: 100%;
    height: 300vh;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
        url(${(props) => props.bgPhoto});
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 70px;
    margin-bottom: 20px;
`;

const Overview = styled.p`
    font-size: 20px;
    width: 50%;
`;

const Slider = styled.div`
    position: relative;
    top: -200px;
`;

const Row = styled(motion.div)`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    height: 200px;
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

const rowVariants = {
    hidden: {
        x: window.outerWidth + 5,
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.outerWidth - 5,
    },
};

const boxVariants = {
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

const Info = styled(motion.div)`
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

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.2,
            type: "tween",
        },
    },
};

function Home() {
    const offset = 6;
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "nowPlaying"],
        getMovies
    );

    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);

    function increaseIndex() {
        if (data) {
            if (leaving) return;

            const totalMoviesLength = data.results.length - 1;
            const maxIndex = Math.floor(totalMoviesLength / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
            setLeaving(true);
        }
    }

    function toggleLeaving() {
        setLeaving((prev) => !prev);
    }

    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading</Loader>
            ) : (
                <>
                    <Banner
                        onClick={increaseIndex}
                        bgPhoto={makeImagePath(
                            data?.results[0].backdrop_path as ""
                        )}
                    >
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>

                    <Slider>
                        <AnimatePresence
                            initial={false}
                            onExitComplete={toggleLeaving}
                        >
                            <Row
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ type: "tween", duration: 0.7 }}
                                key={index}
                            >
                                {data?.results
                                    .slice(1)
                                    .slice(
                                        offset * index,
                                        offset * index + offset
                                    )
                                    .map((movie) => (
                                        <Box
                                            variants={boxVariants}
                                            whileHover="hover"
                                            initial="normal"
                                            transition={{ type: "tween" }}
                                            key={movie.id}
                                            bgPhoto={makeImagePath(
                                                movie.backdrop_path,
                                                "w500"
                                            )}
                                        >
                                            <Info variants={infoVariants}>
                                                <h4>{movie.title}</h4>
                                            </Info>
                                        </Box>
                                    ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </>
            )}
        </Wrapper>
    );
}

export default Home;
