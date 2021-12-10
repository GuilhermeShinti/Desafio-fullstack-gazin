import { Link } from "react-router-dom";
import { Container, Content } from "./styles";

interface HeaderProps {
    buttonText: string;
    goTo: string;
  }

export function Header({buttonText, goTo} : HeaderProps) {
    return (
        <Container>
            <Content>
                <Link className="linkButton" to={goTo}><button>{buttonText}</button></Link>
            </Content>
        </Container>
    );
}