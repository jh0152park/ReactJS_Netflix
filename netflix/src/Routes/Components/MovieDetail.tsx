import { useHistory } from "react-router-dom";
import {
    BigCover,
    BigMovie,
    BigOverview,
    BigTitle,
    Overlay,
} from "../Styles/MovieDetailStyled";
import { makeImagePath } from "../../utils";
import YouTube from "react-youtube";
import { IGetMoviesResult, getMovieVideo } from "../../api";
import { useQuery } from "react-query";

interface IMovieDetails {
    genres: [{ id: number; name: string }];
    homepage: string;
    release_data: string;
    runtime: number;
    vote_average: number;
}

function MovieDatail({ bigMovieMatch, clickedMovie, y }: any) {
    let videoKey = "";
    const history = useHistory();
    const originId = bigMovieMatch.params.movieId.slice(3);

    const { data: videos, isLoading: videosLoading } = useQuery("videos", () =>
        getMovieVideo(originId)
    );

    function onOverlayClicked() {
        history.goBack();
    }

    function getVideoId() {
        if (!videosLoading) {
            for (var i of videos.results) {
                if (
                    i.site.toLowerCase() === "youtube" &&
                    (i.type.toLowerCase() === "clip" ||
                        i.type.toLowerCase() === "teaser" ||
                        i.type.toLowerCase() === "trailer")
                ) {
                    return i.key;
                }
            }
            return "na";
        }
    }

    videoKey = getVideoId();

    return (
        <>
            {videosLoading ? null : (
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
                                {videoKey === "na" ? (
                                    <BigCover
                                        style={{
                                            backgroundImage: `url(${makeImagePath(
                                                clickedMovie.backdrop_path,
                                                "w500"
                                            )})`,
                                        }}
                                    ></BigCover>
                                ) : (
                                    <YouTube
                                        videoId={videoKey}
                                        opts={{
                                            width: "100%",
                                            height: "400",
                                            playerVars: {
                                                autoPlay: true,
                                                rel: 0,
                                                modestbranding: 1,
                                            },
                                        }}
                                        onEnd={(e) => {
                                            e.target.stopVideo(0);
                                        }}
                                    ></YouTube>
                                )}
                                <BigTitle>{clickedMovie.title}</BigTitle>
                                <BigOverview>
                                    {clickedMovie.overview}
                                </BigOverview>
                            </>
                        )}
                    </BigMovie>
                </>
            )}
        </>
    );
}

export default MovieDatail;
