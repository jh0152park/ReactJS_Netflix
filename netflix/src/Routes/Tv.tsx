import { useQuery } from "react-query";
import {
    IGetMoviesResult,
    IMovie,
    getAiringTodayTV,
    getMovies,
    getOnTheAirTV,
    getPopularMovies,
    getPopularTV,
    getTopRatedMovies,
    getTopRatedTV,
    getUpcomingMovies,
} from "../api";

import { AnimatePresence, useScroll } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";

import { CategoryRow, Loader, Wrapper } from "./Styles/HomeStyled";
import MainDisplay from "./Components/MainDisplay";
import Slide from "./Components/Slide";
import MovieDatail from "./Components/MovieDetail";
import Footer from "./Components/Footer";

function Tv() {
    const { scrollY } = useScroll();
    const bigMovieMatch = useRouteMatch<{ movieId: string }>(
        "/movies/:movieId"
    );

    const { data: aringTV, isLoading: aringTVLoading } =
        useQuery<IGetMoviesResult>("airing", () => getAiringTodayTV());

    const { data: onTheAirTV, isLoading: onTheAirTVLoading } =
        useQuery<IGetMoviesResult>("ontheair", () => getOnTheAirTV());

    const { data: popularTV, isLoading: popularTVLoading } =
        useQuery<IGetMoviesResult>("popularTV", () => getPopularTV(3));

    const { data: topRatedTV, isLoading: topRatedTVLoading } =
        useQuery<IGetMoviesResult>("topRatedTV", () => getTopRatedTV());

    let clickedMovie: any = {
        backdrop_path: "",
        poster_path: "",
        title: "",
        overview: "",
        id: 0,
    };

    function isTvClicked() {
        let moives: any;
        let category = "";

        if (bigMovieMatch?.params.movieId) {
            category = bigMovieMatch?.params.movieId.slice(0, 3);
            if (category === "tv_art") {
                moives = aringTV;
            } else if (category === "tv_pop") {
                moives = popularTV;
            } else if (category === "tv_top") {
                moives = topRatedTV;
            } else {
                moives = onTheAirTV;
            }
            clickedMovie = moives?.results.find(
                (movie: any) =>
                    movie.id + "" === bigMovieMatch.params.movieId.slice(3)
            );
        }
    }

    isTvClicked();

    return (
        <Wrapper>
            {aringTVLoading ||
            onTheAirTVLoading ||
            popularTVLoading ||
            topRatedTVLoading ? (
                <Loader>Loading</Loader>
            ) : (
                <>
                    <MainDisplay
                        id={aringTV?.results[0].id + ""}
                        title={aringTV?.results[0].title}
                        overview={aringTV?.results[0].overview}
                        bgIamgePath={aringTV?.results[0].backdrop_path}
                    ></MainDisplay>

                    <CategoryRow>
                        <Slide
                            data={aringTV}
                            title="Airing Today"
                            category="tv_art"
                        ></Slide>
                    </CategoryRow>

                    <CategoryRow>
                        <Slide
                            data={onTheAirTV}
                            title="On the Air"
                            category="tv_ota"
                        ></Slide>
                    </CategoryRow>

                    <CategoryRow>
                        <Slide
                            data={popularTV}
                            title="Popular TV"
                            category="tv_pop"
                        ></Slide>
                    </CategoryRow>

                    <CategoryRow>
                        <Slide
                            data={topRatedTV}
                            title="Top Rated"
                            category="tv_top"
                        ></Slide>
                    </CategoryRow>

                    <AnimatePresence>
                        {bigMovieMatch ? (
                            <>
                                <MovieDatail
                                    bigMovieMatch={bigMovieMatch}
                                    clickedMovie={clickedMovie}
                                    y={scrollY.get()}
                                ></MovieDatail>
                            </>
                        ) : null}
                    </AnimatePresence>

                    <Footer></Footer>
                </>
            )}
        </Wrapper>
    );
}

export default Tv;
