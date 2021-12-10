import { Component } from "react";
import { Container } from "./style";

export class Content extends Component  {
    render() {
        return (
            <Container>
                {this.props.children}
            </Container>
        );
      }
}