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

        tbody > tr {
            background: var(--shape);
        }

        th {
            padding: 1rem 2rem;
            font-weight: 400;
            line-height: 1.5rem;
            text-align: left;
            color: var(--text-body);
        }

        td {
            padding: 0.5rem 2rem;
            color: var(--text-body);
            border: 0;
            border-radius: 0.25rem;

            &:first-child {
                color: var(--firstchild);
            }

            &.actionButtons {
                display: flex;
                justify-content: end;
            }

            button.edit  {
                background: #4e5815cc;
            }
            
            button.delete  {
                background: #581515b3;
            }

            button.edit, button.delete  {
                margin-left: 1rem;
                padding: 0 1rem;
                height: 2rem;
                font-size: 1rem;
                color: #ffffff;
                border: 0;
                border-radius: 0.25rem;
                transition: filter 0.2s ease-in-out;

                &:hover {
                    filter: brightness(0.5);
                }
            }
        }
    }
`;