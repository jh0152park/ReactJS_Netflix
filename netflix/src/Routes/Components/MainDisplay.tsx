import { motion } from "framer-motion";
import { styled } from "styled-components";
import { makeImagePath } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faPlay } from "@fortawesome/free-solid-svg-icons";

interface IDisplay {
    title?: string;
    overview?: string;
    bgIamgePath?: string;
}

export const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
        url(${(props) => props.bgPhoto});
    background-size: cover;
`;

export const Title = styled.h2`
    font-size: 70px;
    margin-bottom: 20px;
`;

export const Overview = styled.p`
    font-size: 20px;
    width: 50%;
`;

export const Buttons = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 400px;
    height: 100px;
    gap: 15px;
    font-weight: bold;
    font-size: 22px;
`;

export const PlayButton = styled(motion.div)`
    width: 150px;
    height: 60px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.white.darker};
    color: ${(props) => props.theme.black.darker};
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        margin-left: 10px;
    }
`;

export const MoreInfoButton = styled(motion.div)`
    width: 200px;
    height: 60px;
    border-radius: 5px;
    background-color: rgba(73, 74, 68, 0.8);
    color: ${(props) => props.theme.white.darker};
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        margin-left: 10px;
    }
`;

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
