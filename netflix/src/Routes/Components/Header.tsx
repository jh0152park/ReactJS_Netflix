import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Navigation = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    /* background-color: ${(props) => props.theme.black.deepDark}; */
    font-size: 14px;

    padding: 30px 60px;
    color: white;
    height: 40px;
    box-sizing: border-box;
    z-index: 99;
`;

const Column = styled.div`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.white.darker};
`;

const Logo = styled(motion.svg)`
    margin-right: 50px;
    width: 95px;
    height: 25px;
    fill: ${(props) => props.theme.red};
    font-size: 10px;
    /* path {
        stroke: white;
        stroke-width: 5px;
    } */
`;

const LogoVariant = {
    normal: {
        // fillOpacity: 1,
        strokeWidth: "0px",
    },
    active: {
        // fillOpacity: 0,
        stroke: "white",
        strokeWidth: "10px",

        transition: {
            duration: 0.5,
            // repeat: Infinity,
        },
    },
};

const Items = styled.ul`
    display: flex;
    align-items: "center";
    font-weight: 400;
`;

const Item = styled.li`
    margin-right: 20px;
    color: ${(props) => props.theme.white.darker};
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;

    &:hover {
        /* color: ${(props) => props.theme.white.ligher}; */
        opacity: 0.7;
        transition: opacity, 0.3s ease-in-out;
    }
`;

const Circle = styled(motion.span)`
    position: absolute;
    width: 7px;
    height: 7px;
    background-color: ${(props) => props.theme.red};
    border-radius: 50%;
    bottom: -13px;
    left: 0;
    right: 0;
    margin: 0 auto;
`;

const Search = styled.form`
    color: ${(props) => props.theme.white.darker};
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 15px;
    svg {
        height: 25px;
    }
`;

const SearchBox = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    right: 0px;
    padding: 8px 10px;
    padding-left: 40px;
    width: 230px;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0.6;
    border: 1px solid ${(props) => props.theme.white.darker};
    color: ${(props) => props.theme.white.darker};
    &::placeholder {
        font-size: 14px;
    }
`;

const navigationVariants = {
    top: {
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    scroll: {
        backgroundColor: "rgba(0, 0, 0, 1)",
    },
};

interface IForm {
    keyword: string;
}

function Header() {
    const homeMatch = useRouteMatch("/");
    const tvMatch = useRouteMatch("/tv");
    const movieMatch = useRouteMatch("/movie");
    const latestMatch = useRouteMatch("/latest");
    const myListMatch = useRouteMatch("/my-list");
    const originalAudioMatch = useRouteMatch("/original-audio");

    const { scrollY } = useScroll();
    const [searchOpen, setSearchOpen] = useState(false);

    const inputAnimation = useAnimation();
    const navAnimation = useAnimation();

    const history = useHistory();
    const { register, handleSubmit } = useForm<IForm>();

    function toggleSearch() {
        // if (searchOpen) {
        //     inputAnimation.start({
        //         scaleX: 0,
        //     });
        // } else {
        //     inputAnimation.start({
        //         scaleX: 1,
        //     });
        // }
        setSearchOpen((prev) => !prev);
    }

    function onValid(data: IForm) {
        console.log(data);
        history.push(`/search?keyword=${data.keyword}`);
    }

    useEffect(() => {
        scrollY.onChange(() => {
            if (scrollY.get() > 80) {
                navAnimation.start("scroll");
            } else {
                navAnimation.start("top");
            }
        });
    }, [scrollY, navAnimation]);

    return (
        <Navigation
            onClick={(e) => {
                const input = document.getElementById("searchBox");
                if (e.target !== input && searchOpen) {
                    setSearchOpen(false);
                }
            }}
            variants={navigationVariants}
            animate={navAnimation}
            initial="top"
        >
            <Column>
                <Link to="/">
                    <Logo
                        variants={LogoVariant}
                        initial="normal"
                        whileHover="active"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1024"
                        height="276.742"
                        viewBox="0 0 1024 276.742"
                    >
                        <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
                    </Logo>
                </Link>
                <Items>
                    <Link to="/">
                        <Item>
                            Home
                            {homeMatch?.isExact && (
                                <Circle layoutId="statusDot" />
                            )}
                        </Item>
                    </Link>

                    <Link to="/tv">
                        <Item>
                            TV Shows
                            {tvMatch && <Circle layoutId="statusDot" />}
                        </Item>
                    </Link>

                    {/* <Link to="/movie">
                        <Item>
                            Movies
                            {movieMatch && <Circle layoutId="statusDot" />}
                        </Item>
                    </Link>

                    <Link to="/latest">
                        <Item>
                            New & Popular
                            {latestMatch && <Circle layoutId="statusDot" />}
                        </Item>
                    </Link>

                    <Link to="/my-list">
                        <Item>
                            My List
                            {myListMatch && <Circle layoutId="statusDot" />}
                        </Item>
                    </Link>

                    <Link to="/original-audio">
                        <Item>
                            Browse by Languages
                            {originalAudioMatch && (
                                <Circle layoutId="statusDot" />
                            )}
                        </Item>
                    </Link> */}
                </Items>
            </Column>
            <Column>
                <Search onSubmit={handleSubmit(onValid)}>
                    <motion.svg
                        onClick={toggleSearch}
                        whileHover={{ cursor: "pointer" }}
                        animate={{ x: searchOpen ? -245 : 0 }}
                        transition={{ type: "linear" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </motion.svg>
                    <SearchBox
                        //animate={inputAnimation}
                        //initial={{ scaleX: 0 }}
                        {...register("keyword", {
                            required: true,
                            minLength: 2,
                        })}
                        id="searchBox"
                        animate={{ scaleX: searchOpen ? 1 : 0 }}
                        transition={{ type: "linear" }}
                        placeholder="Titles, people, genres"
                    />
                </Search>
                <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Bell"
                    aria-hidden="true"
                    whileHover={{ cursor: "pointer", scale: 1.1 }}
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z"
                        fill="currentColor"
                    ></path>
                </motion.svg>

                <motion.img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
                    style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "5px",
                        marginLeft: "20px",
                    }}
                    whileHover={{ cursor: "pointer", scale: 1.1, rotateZ: 360 }}
                    transition={{ duration: 0.5 }}
                ></motion.img>
            </Column>
        </Navigation>
    );
}

export default Header;
