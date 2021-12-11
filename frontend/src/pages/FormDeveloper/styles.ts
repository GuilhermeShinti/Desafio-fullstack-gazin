import styled from "styled-components";


export const Container = styled.div`

    hr {
        margin-bottom: 2rem;
    }

    form {
        input, select {
            padding: 0 1.5rem;
            width: 100%;
            height: 3rem;
            font-size: 1rem;
            font-weight: 400;
            background: #e7e9ee;
            border: 1px solid #d7d7d7;
            border-radius: 0.25rem;
            margin-bottom: 1rem;
        }

        input&:first {
            cursor: not-allowed;
        }

        button.submit {
            float: right;
            padding: 0 2rem;
            height: 3rem;
            font-size: 1rem;
            color: #ffffff;
            background: rgb(21, 88, 82);
            border: 0;
            border-radius: 0.25rem;
            transition: filter 0.2s ease-in-out;

            &:hover {
                filter: brightness(0.9);
            }
        }
    }
`;