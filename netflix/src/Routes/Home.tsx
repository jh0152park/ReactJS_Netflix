import { useQuery } from "react-query";
import {
    IGetMoviesResult,
    getMovies,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
} from "../api";
import { makeImagePath } from "../utils";
import { AnimatePresence, useScroll } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";

import {
    BigCover,
    BigMovie,
    BigOverview,
    BigTitle,
    CategoryRow,
    Loader,
    Overlay,
    Wrapper,
} from "./Styles/HomeStyled";
import MainDisplay from "./Components/MainDisplay";
import Slide from "./Components/Slide";

function Home() {
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{ movieId: string }>(
        "/movies/:movieId"
    );

    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "nowPlaying"],
        getMovies
    );

    const { data: popularMovies, isLoading: popularMoviesLoading } =
        useQuery<IGetMoviesResult>("popular", getPopularMovies);

    const { data: topRatedMovies, isLoading: topRatedMoviesLoading } =
        useQuery<IGetMoviesResult>("topRated", getTopRatedMovies);

    const { data: upcomingMovies, isLoading: upcomingMoviesLoading } =
        useQuery<IGetMoviesResult>("upcoming", getUpcomingMovies);

    const { scrollY } = useScroll();

    const clickedMovie =
        bigMovieMatch?.params.movieId &&
        data?.results.find(
            (movie) => movie.id + "" === bigMovieMatch.params.movieId
        );

    function onOverlayClicked() {
        history.goBack();
    }

    if (popularMoviesLoading) {
        console.log(popularMovies);
    }

    return (
        <Wrapper>
            {isLoading &&
            popularMoviesLoading &&
            topRatedMoviesLoading &&
            upcomingMoviesLoading ? (
                <Loader>Loading</Loader>
            ) : (
                <>
                    <MainDisplay
                        title={data?.results[0].title}
                        overview={data?.results[0].overview}
                        bgIamgePath={data?.results[0].backdrop_path}
                    ></MainDisplay>

                    <CategoryRow>
                        <Slide
                            data={data}
                            title="Trending Now"
                            category="trd"
                        ></Slide>
                    </CategoryRow>

                    <CategoryRow>
                        <Slide
                            data={popularMovies}
                            title="Popular on Netflix"
                            category="pop"
                        ></Slide>
                    </CategoryRow>

                    <CategoryRow>
                        <Slide
                            data={topRatedMovies}
                            title="Top Rated"
                            category="top"
                        ></Slide>
                    </CategoryRow>

                    <CategoryRow>
                        <Slide
                            data={upcomingMovies}
                            title="Up Coming"
                            category="upc"
                        ></Slide>
                    </CategoryRow>

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
