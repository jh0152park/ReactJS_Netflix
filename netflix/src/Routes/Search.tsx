import { useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import { useQueries, useQuery } from "react-query";
import { getMovieSearch } from "../api";
import { CategoryRow } from "./Styles/HomeStyled";
import Slide from "./Components/Slide";

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");

    console.log(keyword);

    const queryReuslts = useQueries(
        [1, 2, 3, 4].map((page) => ({
            queryKey: ["page", page],
            queryFn: () => getMovieSearch(page, keyword + ""),
        }))
    );

    const loading = queryReuslts.some((result) => result.isLoading);

    // function DynamicQueries() {
    //     const queryReuslts = useQueries(
    //         [1, 2, 3, 4].map((page) => ({
    //             queryKey: ["page", page],
    //             queryFn: () => getMovieSearch(page, keyword + ""),
    //         }))
    //     );

    //
    //     if (!loading) {
    //         for (var i of queryReuslts) {
    //             console.log(i.data);
    //         }
    //     }
    // }

    console.log(queryReuslts[0].data);

    return (
        <>
            {loading ? (
                <h4>Loading...</h4>
            ) : (
                <>
                    <CategoryRow
                        style={{
                            marginTop: "400px",
                        }}
                    >
                        <Slide
                            data={queryReuslts[0].data}
                            title={`"${keyword}" Search Results`}
                            category="trd"
                        ></Slide>
                    </CategoryRow>

                    <CategoryRow
                        style={{
                            marginTop: "-50px",
                        }}
                    >
                        <Slide
                            data={queryReuslts[1].data}
                            title=""
                            category="trd"
                        ></Slide>
                    </CategoryRow>

                    <CategoryRow
                        style={{
                            marginTop: "-50px",
                        }}
                    >
                        <Slide
                            data={queryReuslts[2].data}
                            title=""
                            category="trd"
                        ></Slide>
                    </CategoryRow>

                    <CategoryRow
                        style={{
                            marginTop: "-50px",
                        }}
                    >
                        <Slide
                            data={queryReuslts[3].data}
                            title=""
                            category="trd"
                        ></Slide>
                    </CategoryRow>

                    <Footer></Footer>
                </>
            )}
        </>
    );
}

export default Search;
