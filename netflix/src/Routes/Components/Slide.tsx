import { AnimatePresence } from "framer-motion";
import {
    Box,
    Info,
    LeftSlideButton,
    RightSlideButton,
    Row,
    Slider,
    SubTitle,
    boxVariants,
    infoVariants,
    rowVariants,
} from "../Styles/SlideStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { makeImagePath } from "../../utils";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const offset = 6;

function Slide({ data, title, category }: any) {
    const location = useLocation();
    const history = useHistory();
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [slideDir, setSlideDir] = useState(1);

    function increaseIndex() {
        if (data) {
            if (leaving) return;

            const totalMoviesLength = data.results.length - 1;
            const maxIndex = Math.floor(totalMoviesLength / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
            setLeaving(true);
            setSlideDir(1);
        }
    }

    function decreaseIndex() {
        if (data) {
            if (leaving) return;

            const totalMoviesLength = data.results.length - 1;
            const maxIndex = Math.floor(totalMoviesLength / offset) - 1;
            setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
            setLeaving(true);
            setSlideDir(-1);
        }
    }

    function toggleLeaving() {
        setLeaving((prev) => !prev);
    }

    function onBoxClicked(movieId: number) {
        if (category.slice(0, 3) === "tv_") {
            history.push(`/tv/${movieId}`);
        } else if (category.slice(0, 3) === "src") {
            const currentPath = location.pathname + location.search;
            // history.push(`${currentPath}/${movieId}`);
        } else {
            history.push(`/movies/${movieId}`);
        }
    }

    return (
        <Slider>
            <SubTitle>{title}</SubTitle>
            <AnimatePresence
                initial={false}
                onExitComplete={toggleLeaving}
                custom={slideDir}
            >
                <LeftSlideButton onClick={decreaseIndex}>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} size="2x" />
                </LeftSlideButton>

                <Row
                    custom={slideDir}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 0.7 }}
                    key={index}
                >
                    {data?.results
                        .slice(1)
                        .slice(offset * index, offset * index + offset)
                        .map((movie: any) => (
                            <Box
                                variants={boxVariants}
                                whileHover="hover"
                                initial="normal"
                                transition={{ type: "tween" }}
                                key={category + movie.id}
                                layoutId={category + movie.id + ""}
                                onClick={() =>
                                    onBoxClicked(category + movie.id)
                                }
                                bgPhoto={makeImagePath(
                                    movie.backdrop_path
                                        ? movie.backdrop_path
                                        : movie.poster_path,
                                    "w500"
                                )}
                            >
                                <img src="https://www.svgrepo.com/show/303341/netflix-1-logo.svg"></img>
                                <Info variants={infoVariants}>
                                    <h4>
                                        {movie.title ? movie.title : movie.name}
                                    </h4>
                                </Info>
                            </Box>
                        ))}
                </Row>
                <RightSlideButton onClick={increaseIndex}>
                    <FontAwesomeIcon icon={faAngleDoubleRight} size="2x" />
                </RightSlideButton>
            </AnimatePresence>
        </Slider>
    );
}

export default Slide;
