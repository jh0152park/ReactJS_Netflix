export const API_KEY = "739a70884a166d46814e605301568d2d";
const BASE_URL = "https://api.themoviedb.org/3";

interface IMovie {
    backdrop_path: string;
    pster_path: string;
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
