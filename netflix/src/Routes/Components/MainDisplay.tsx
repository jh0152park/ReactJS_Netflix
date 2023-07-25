import { makeImagePath } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
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
                    <FontAwesomeIcon icon={faPlay} size="xl" />
                    <span>Play</span>
                </PlayButton>
                <MoreInfoButton
                    whileHover={{
                        cursor: "pointer",
                        backgroundColor: "rgba(73, 74, 68, 0.6)",
                    }}
                >
                    <FontAwesomeIcon icon={faInfoCircle} size="xl" />
                    <span>More Info</span>
                </MoreInfoButton>
            </Buttons>
        </Banner>
    );
}

export default MainDisplay;
