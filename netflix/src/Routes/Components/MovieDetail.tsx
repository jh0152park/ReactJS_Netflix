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
import {
    IGetMoviesResult,
    getMovieDetail,
    getMovieVideo,
    getTVDetail,
    getTVVideo,
} from "../../api";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

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

    const inputId = bigMovieMatch.params.movieId
        ? bigMovieMatch.params.movieId
        : "tv_" + bigMovieMatch.params.tvId;

    const isMovie = bigMovieMatch.params.movieId ? true : false;

    const {
        data: videos,
        isLoading: videosLoading,
        refetch: videoRefresh,
    } = useQuery("videos", () => getMovieVideo(originId));

    const {
        data: TVVideos,
        isLoading: TVVideosLoading,
        refetch: TVRefresh,
    } = useQuery("TVVideos", () => getTVVideo(originId));

    const {
        data: detail,
        isLoading: detailLoading,
        refetch: movieDetailRefresh,
    } = useQuery<IMovieDetails>("detail", () => getMovieDetail(originId));

    const {
        data: TVDetail,
        isLoading: TVDetailLoading,
        refetch: TVDetailRefresh,
    } = useQuery<IMovieDetails>("detail", () => getTVDetail(originId));

    function onOverlayClicked() {
        history.goBack();
    }

    function getVideoId() {
        if (isMovie) {
            if (!videosLoading && videos.results) {
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
        } else {
            if (!TVVideosLoading && TVVideos.results) {
                for (var i of TVVideos.results) {
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
    }

    function getGenres() {
        if (isMovie) {
            if (!detailLoading && detail?.genres) {
                let gen = "";
                for (var i of detail?.genres) {
                    gen += i.name + ", ";
                }
                return gen.slice(0, gen.length - 2);
            }
        } else {
            if (!TVDetailLoading && TVDetail?.genres) {
                let gen = "";
                for (var i of TVDetail?.genres) {
                    gen += i.name + ", ";
                }
                return gen.slice(0, gen.length - 2);
            }
        }
    }

    videoKey = getVideoId();

    return (
        <>
            {videosLoading ||
            TVVideosLoading ||
            detailLoading ||
            TVDetailLoading ? null : (
                <>
                    <Overlay
                        onClick={onOverlayClicked}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                    <BigMovie layoutId={inputId} style={{ top: y + 100 }}>
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
                                        // onPlay={(e) => {
                                        //     e.target.playVideo();
                                        // }}
                                        onReady={(e) => {
                                            e.target.playVideo(true);
                                        }}
                                    ></YouTube>
                                )}
                                <BigTitle>
                                    {clickedMovie.title
                                        ? clickedMovie.title
                                        : clickedMovie.name}
                                    <Vote>
                                        {detail?.vote_average
                                            ? (
                                                  detail?.vote_average * 10
                                              ).toFixed()
                                            : detail?.vote_average
                                            ? detail?.vote_average
                                            : 0}
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
