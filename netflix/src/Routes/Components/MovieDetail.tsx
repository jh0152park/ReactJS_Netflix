import { useHistory } from "react-router-dom";
import {
    BigCover,
    BigMovie,
    BigOverview,
    BigTitle,
    Description,
    Explain,
    Overlay,
    SubRow,
    Subtitle,
    SubtitleText,
    Vote,
} from "../Styles/MovieDetailStyled";
import { makeImagePath } from "../../utils";
import YouTube from "react-youtube";
import { IGetMoviesResult, getMovieDetail, getMovieVideo } from "../../api";
import { useQuery } from "react-query";

interface IMovieDetails {
    genres: [{ id: number; name: string }];
    homepage: string;
    release_date: string;
    runtime: number;
    vote_average: number;
}

function MovieDatail({ bigMovieMatch, clickedMovie, y }: any) {
    let videoKey = "";
    const history = useHistory();
    const originId = bigMovieMatch.params.movieId
        ? bigMovieMatch.params.movieId.slice(3)
        : bigMovieMatch.params.tvId.slice(3);

    const { data: videos, isLoading: videosLoading } = useQuery("videos", () =>
        getMovieVideo(originId)
    );

    const { data: detail, isLoading: detailLoading } = useQuery<IMovieDetails>(
        "detail",
        () => getMovieDetail(originId)
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

    function getGenres() {
        if (!detailLoading && detail?.genres) {
            let gen = "";
            for (var i of detail?.genres) {
                gen += i.name + ", ";
            }
            return gen.slice(0, gen.length - 2);
        }
    }

    videoKey = getVideoId();

    // if (!detailLoading) {
    //     console.log(detail?.homepage);

    // }

    return (
        <>
            {videosLoading || detailLoading ? null : (
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
                                <BigTitle>
                                    {clickedMovie.title}
                                    <Vote>
                                        {detail?.vote_average
                                            ? (
                                                  detail?.vote_average * 10
                                              ).toFixed()
                                            : detail?.vote_average}
                                        % Match
                                    </Vote>
                                </BigTitle>

                                <Explain>
                                    <BigOverview>
                                        {clickedMovie.overview}
                                    </BigOverview>

                                    <Description>
                                        <SubRow>
                                            <Subtitle>Genres: </Subtitle>
                                            <SubtitleText>
                                                {getGenres()}
                                            </SubtitleText>
                                        </SubRow>

                                        <SubRow>
                                            <Subtitle>Runtime: </Subtitle>
                                            <SubtitleText>
                                                {detail?.runtime} Minutes
                                            </SubtitleText>
                                        </SubRow>

                                        <SubRow>
                                            <Subtitle>Release Date: </Subtitle>
                                            <SubtitleText>
                                                {detail?.release_date}
                                            </SubtitleText>
                                        </SubRow>

                                        <SubRow>
                                            <Subtitle>Homepage: </Subtitle>
                                            <a
                                                href={detail?.homepage}
                                                target="_blank"
                                            >
                                                <SubtitleText>
                                                    {detail?.homepage}
                                                </SubtitleText>
                                            </a>
                                        </SubRow>
                                    </Description>
                                </Explain>
                            </>
                        )}
                    </BigMovie>
                </>
            )}
        </>
    );
}

export default MovieDatail;
