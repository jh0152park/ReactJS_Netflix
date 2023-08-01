import { useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import { useQueries, useQuery } from "react-query";
import { getMovieSearch } from "../api";
import { CategoryRow } from "./Styles/HomeStyled";
import Slide from "./Components/Slide";
import { useEffect } from "react";

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

    useEffect(() => {
        queryReuslts[0].refetch();
        queryReuslts[1].refetch();
        queryReuslts[2].refetch();
        queryReuslts[3].refetch();
    }, [keyword]);

    const loading = queryReuslts.some((result) => result.isLoading);

    const isExist =
        !loading && queryReuslts[0].data?.results.length === 0 ? false : true;
    console.log(`is exist : ${isExist}`);

    return (
        <>
            {loading ? (
                <h4>Loading...</h4>
            ) : (
                <>
                    {!isExist ? (
                        <h1
                            style={{
                                marginTop: "150px",
                                marginLeft: "60px",
                                fontSize: "20px",
                            }}
                        >
                            No search results found of "{keyword}"...
                        </h1>
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
            )}
        </>
    );
}

export default Search;
