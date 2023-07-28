import { useHistory } from "react-router-dom";
import {
    BigCover,
    BigMovie,
    BigOverview,
    BigTitle,
    Overlay,
} from "../Styles/MovieDetailStyled";
import { makeImagePath } from "../../utils";
import { useScroll } from "framer-motion";

function MovieDatail({ bigMovieMatch, clickedMovie, y }: any) {
    const history = useHistory();

    function onOverlayClicked() {
        history.goBack();
    }

    return (
        <>
            <Overlay
                onClick={onOverlayClicked}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
            <BigMovie
                layoutId={bigMovieMatch.params.movieId}
                style={{ top: y + 100 }}
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
                        <BigTitle>{clickedMovie.title}</BigTitle>
                        <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                )}
            </BigMovie>
        </>
    );
}

export default MovieDatail;
