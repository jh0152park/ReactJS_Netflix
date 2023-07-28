import { motion } from "framer-motion";
import { styled } from "styled-components";

export const Wrapper = styled.div`
    width: 600px;
    height: 350px;
    /* background-color: rgba(1, 1, 1, 0.5); */
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: -450px;
`;

export const SNS = styled.div`
    width: 50%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    gap: 20px;
    margin-bottom: 5px;
`;

export const Links = styled.div`
    width: 100%;
    height: 100px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);

    span {
        max-width: 130px;
    }
    span:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;

export const ServiceCode = styled.div`
    width: 100px;
    height: 30px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    color: rgba(255, 255, 255, 0.3);
    font-size: 13px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 25px;

    &:hover {
        cursor: pointer;
        color: rgba(255, 255, 255, 1);
    }
`;

export const Info = styled.div`
    width: 100%;
    height: 50%;
    color: rgba(255, 255, 255, 0.4);
    font-size: 11px;

    p {
        margin: 5px 0%;
    }
`;
