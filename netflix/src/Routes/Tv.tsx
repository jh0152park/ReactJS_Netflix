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
    const bigTVMatch = useRouteMatch<{ tvId: string }>("/tv/tv_:tvId");

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
        let tvs: any;
        let category = "";

        if (bigTVMatch?.params.tvId) {
            category = bigTVMatch?.params.tvId.slice(0, 3);
            if (category === "art") {
                tvs = aringTV;
            } else if (category === "pop") {
                tvs = popularTV;
            } else if (category === "top") {
                tvs = topRatedTV;
            } else {
                tvs = onTheAirTV;
            }
            clickedMovie = tvs?.results.find(
                (tv: any) => tv.id + "" === bigTVMatch.params.tvId.slice(3)
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
                        category="tv_art"
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
                        {bigTVMatch ? (
                            <>
                                <MovieDatail
                                    bigMovieMatch={bigTVMatch}
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
