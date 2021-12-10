import { Link } from "react-router-dom";
import { Container, Content, StyledLink } from "./styles";

export function Home() {
    return (
        <Container>
            <Content>
                <StyledLink className="homeButton" to="levels"><button>Niveis</button></StyledLink>
                <StyledLink className="homeButton" to="developers"><button>Desenvolvedores</button></StyledLink>
            </Content>
        </Container>
    )
}