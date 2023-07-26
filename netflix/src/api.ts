const API_KEY = "739a70884a166d46814e605301568d2d";
const BASE_URL = "https://api.themoviedb.org/3";

interface IMovie {
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    id: number;
}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export function getMovies() {
    return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getPopularMovies() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzlhNzA4ODRhMTY2ZDQ2ODE0ZTYwNTMwMTU2OGQyZCIsInN1YiI6IjY0YmEyMDIwMzAwOWFhMDBlMjY0Y2VhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eHILwGMMFNYioeUQaVUSgf_kU4PRKZP99iDQOHXQRpI",
        },
    };

    return fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
    ).then((response) => response.json());
}

export function getTopRatedMovies() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzlhNzA4ODRhMTY2ZDQ2ODE0ZTYwNTMwMTU2OGQyZCIsInN1YiI6IjY0YmEyMDIwMzAwOWFhMDBlMjY0Y2VhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eHILwGMMFNYioeUQaVUSgf_kU4PRKZP99iDQOHXQRpI",
        },
    };

    return fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
    ).then((response) => response.json());
}

export function getUpcomingMovies() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzlhNzA4ODRhMTY2ZDQ2ODE0ZTYwNTMwMTU2OGQyZCIsInN1YiI6IjY0YmEyMDIwMzAwOWFhMDBlMjY0Y2VhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eHILwGMMFNYioeUQaVUSgf_kU4PRKZP99iDQOHXQRpI",
        },
    };

    return fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2",
        options
    ).then((response) => response.json());
}
