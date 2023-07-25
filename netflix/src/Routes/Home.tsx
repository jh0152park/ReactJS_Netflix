import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faInfo,
    faInfoCircle,
    faPlay,
} from "@fortawesome/free-solid-svg-icons";

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
    top: -190px;
    margin-left: 60px;
    margin-right: 60px;
`;

const Row = styled(motion.div)`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
    box-sizing: border-box;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
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

const rowVariants = {
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

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

const BigMovie = styled(motion.div)`
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

const BigCover = styled.div`
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center center;
`;

const BigTitle = styled.h3`
    color: ${(props) => props.theme.white.lighter};
    font-size: 28px;
    padding: 20px;
    position: relative;
    top: -60px;
`;

const BigOverview = styled.p`
    color: ${(props) => props.theme.white.lighter};
    padding: 20px;
    position: relative;
    top: -60px;
`;

const SubTitle = styled.div`
    color: ${(props) => props.theme.white.lighter};
    width: 300px;
    height: 50px;
    position: absolute;
    top: -50px;
    font-weight: 400;
    font-size: 28px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 400px;
    height: 100px;
    gap: 15px;
    font-weight: bold;
    font-size: 22px;
`;

const PlayButton = styled(motion.div)`
    width: 150px;
    height: 60px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.white.darker};
    color: ${(props) => props.theme.black.darker};
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        margin-left: 10px;
    }
`;

const MoreInfoButton = styled(motion.div)`
    width: 200px;
    height: 60px;
    border-radius: 5px;
    background-color: rgba(73, 74, 68, 0.8);
    color: ${(props) => props.theme.white.darker};
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        margin-left: 10px;
    }
`;

const LeftSlideButton = styled(motion.div)`
    position: absolute;
    left: -45px;
    top: 65px;
    z-index: 99;
    &:hover {
        cursor: pointer;
        scale: 1.1;
    }
`;

const RightSlideButton = styled(motion.div)`
    position: absolute;
    right: -45px;
    top: 65px;
    z-index: 99;
    &:hover {
        cursor: pointer;
        scale: 1.1;
    }
`;

function Home() {
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{ movieId: string }>(
        "/movies/:movieId"
    );
    const offset = 6;
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "nowPlaying"],
        getMovies
    );

    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [slideDir, setSlideDir] = useState(1);

    const { scrollY } = useScroll();

    const clickedMovie =
        bigMovieMatch?.params.movieId &&
        data?.results.find(
            (movie) => movie.id + "" === bigMovieMatch.params.movieId
        );

    function increaseIndex() {
        if (data) {
            if (leaving) return;

            const totalMoviesLength = data.results.length - 1;
            const maxIndex = Math.floor(totalMoviesLength / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
            setLeaving(true);
            setSlideDir(1);
        }
    }

    function decreaseIndex() {
        if (data) {
            if (leaving) return;

            const totalMoviesLength = data.results.length - 1;
            const maxIndex = Math.floor(totalMoviesLength / offset) - 1;
            setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
            setLeaving(true);
            setSlideDir(-1);
        }
    }

    function toggleLeaving() {
        setLeaving((prev) => !prev);
    }

    function onBoxClicked(movieId: number) {
        history.push(`/movies/${movieId}`);
    }

    function onOverlayClicked() {
        history.goBack();
    }

    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading</Loader>
            ) : (
                <>
                    <Banner
                        bgPhoto={makeImagePath(
                            data?.results[0].backdrop_path as ""
                        )}
                    >
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>

                        <Buttons>
                            <PlayButton
                                whileHover={{ cursor: "pointer", opacity: 0.8 }}
                            >
                                <FontAwesomeIcon icon={faPlay} size="xl" />
                                <span>Play</span>
                            </PlayButton>
                            <MoreInfoButton
                                whileHover={{
                                    cursor: "pointer",
                                    backgroundColor: "rgba(73, 74, 68, 0.6)",
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faInfoCircle}
                                    size="xl"
                                />
                                <span>More Info</span>
                            </MoreInfoButton>
                        </Buttons>
                    </Banner>

                    <Slider>
                        <SubTitle>Popular on Netflix</SubTitle>
                        <AnimatePresence
                            initial={false}
                            onExitComplete={toggleLeaving}
                            custom={slideDir}
                        >
                            <LeftSlideButton onClick={decreaseIndex}>
                                <FontAwesomeIcon
                                    icon={faAngleDoubleLeft}
                                    size="2x"
                                />
                            </LeftSlideButton>

                            <Row
                                custom={slideDir}
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
                                            layoutId={movie.id + ""}
                                            onClick={() =>
                                                onBoxClicked(movie.id)
                                            }
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
                            <RightSlideButton onClick={increaseIndex}>
                                <FontAwesomeIcon
                                    icon={faAngleDoubleRight}
                                    size="2x"
                                />
                            </RightSlideButton>
                        </AnimatePresence>
                    </Slider>

                    <AnimatePresence>
                        {bigMovieMatch ? (
                            <>
                                <Overlay
                                    onClick={onOverlayClicked}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                                <BigMovie
                                    layoutId={bigMovieMatch.params.movieId}
                                    style={{ top: scrollY.get() + 100 }}
                                >
                                    {clickedMovie && (
                                        <>
                                            <BigCover
                                                style={{
                                                    backgroundImage: `url(${makeImagePath(
                                                        clickedMovie.backdrop_path,
                                                        "w500"
                                                    )})`,
                                                }}
                                            ></BigCover>
                                            <BigTitle>
                                                {clickedMovie.title}
                                            </BigTitle>
                                            <BigOverview>
                                                {clickedMovie.overview}
                                            </BigOverview>
                                        </>
                                    )}
                                </BigMovie>
                            </>
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
}

export default Home;
