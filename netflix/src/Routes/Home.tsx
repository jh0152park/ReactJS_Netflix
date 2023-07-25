import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api";
import { makeImagePath } from "../utils";
import { AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import {
    BigCover,
    BigMovie,
    BigOverview,
    BigTitle,
    Box,
    Info,
    LeftSlideButton,
    Loader,
    Overlay,
    RightSlideButton,
    Row,
    Slider,
    SubTitle,
    Wrapper,
    boxVariants,
    infoVariants,
    rowVariants,
} from "./Styles/HomeStyled";
import MainDisplay from "./Components/MainDisplay";

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
                    <MainDisplay
                        title={data?.results[0].title}
                        overview={data?.results[0].overview}
                        bgIamgePath={data?.results[0].backdrop_path}
                    ></MainDisplay>

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
