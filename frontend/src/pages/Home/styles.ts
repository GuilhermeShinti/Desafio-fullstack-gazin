import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    background-color: #153058;
    height: 100vh;
`;

export const StyledLink = styled(Link)`
    width: 100%;

    button {
        width: 100%;
        padding: 0 2rem;
        height: 3rem;
        font-size: 1rem;
        color: #ffffff;
        background: rgb(21, 88, 82);
        border: 0;
        border-radius: 0.25rem;
        transition: filter 0.2s ease-in-out;
        margin-bottom: 1rem;

        &:hover {
            filter: brightness(0.9);
        }
    }
`;

export const Content = styled.div`
    height: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    padding: 2rem 1rem 2rem;
    max-width: 800px;
`;