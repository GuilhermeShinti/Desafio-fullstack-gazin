import { FormEvent, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Content } from "../../components/Content";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Container } from "./styles";

export function FormQualificationLevel() {
    const navigate = useNavigate();
    const location = useLocation();
    const idState = location.state && location.state.idState;
    const levelState = location.state && location.state.levelState;

    const [id, setId] = useState<number>(idState ? Number(idState) : 0);
    const [level, setLevel] = useState<string>(levelState ? levelState : "");

    async function handleSubmitQualificationLevel(event: FormEvent) {
        event.preventDefault();

        await api.post('levels', { id, level });
        navigate("/levels");
    }

    return (
        <>
            <Header buttonText="Voltar" goTo="/levels"/>
            <Container>
                <Content>
                    <h1>Novo Nível</h1>
                    <hr />
                    <form onSubmit={handleSubmitQualificationLevel}>
                        <input name="id" disabled placeholder="id" value={id} onChange={({ target }) => setId(Number(target.value))}></input>
                        <input name="level" placeholder="nível" value={level} required onChange={({ target }) => setLevel(target.value)}></input>
                        <button type="submit">Salvar</button>
                    </form> 
                </Content>
            </Container>
        </>
    )
}