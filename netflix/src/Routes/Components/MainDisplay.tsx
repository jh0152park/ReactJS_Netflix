import { makeImagePath } from "../../utils";
import {
    Banner,
    Buttons,
    MoreInfoButton,
    Overview,
    PlayButton,
    Title,
} from "../Styles/MainDisplayStyled";

interface IDisplay {
    title?: string;
    overview?: string;
    bgIamgePath?: string;
}

function MainDisplay({ title, overview, bgIamgePath }: IDisplay) {
    return (
        <Banner bgPhoto={makeImagePath(bgIamgePath as "")}>
            <Title>{title}</Title>
            <Overview>{overview}</Overview>

            <Buttons>
                <PlayButton whileHover={{ cursor: "pointer", opacity: 0.8 }}>
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Play"
                        aria-hidden="true"
                    >
                        <path
                            d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                    <span>Play</span>
                </PlayButton>
                <MoreInfoButton
                    whileHover={{
                        cursor: "pointer",
                        backgroundColor: "rgba(73, 74, 68, 0.6)",
                    }}
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="CircleI"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                    <span>More Info</span>
                </MoreInfoButton>
            </Buttons>
        </Banner>
    );
}

export default MainDisplay;
