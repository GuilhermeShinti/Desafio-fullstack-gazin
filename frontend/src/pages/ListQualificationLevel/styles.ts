import styled from "styled-components";

export const Container = styled.div`
    margin-top: 2rem;
`;

export const Content = styled.div`

    max-width: 1120px;
    margin: 0 auto;
    --firstchild: #363636;

    table {
        width: 100%;
        border-spacing: 0 0.5rem;

        th {
            padding: 1rem 2rem;
            font-weight: 400;
            line-height: 1.5rem;
            text-align: left;
            color: var(--text-body);
        }

        td {
            padding: 1rem 2rem;
            color: var(--text-body);
            background: var(--shape);
            border: 0;
            border-radius: 0.25rem;

            &:first-child {
                color: var(--firstchild);
            }
        }
    }
`;