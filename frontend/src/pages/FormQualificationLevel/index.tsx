import { FormEvent, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Content } from "../../components/Content";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Container } from "./styles";
import { toast } from 'react-toastify';

export function FormQualificationLevel() {
    const navigate = useNavigate();
    const location = useLocation();
    const { idState, levelState } = location.state || {}

    const [id, setId] = useState<number>(idState ? Number(idState) : 0);
    const [level, setLevel] = useState<string>(levelState ? levelState : "");

    async function handleSubmitQualificationLevel(event: FormEvent) {
        event.preventDefault();
        const isNew = (id === 0);

        try {    
            if (isNew) {
                await api.post('levels', { id, level });
                toast.success("Nível criado com sucesso.");
            } else {
                await api.put(`levels/${id}`, { id, level });
                toast.success("Nível editado com sucesso.");
            }
    
            navigate("/levels");
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <>
            <Header buttonText="Voltar" goTo="/levels"/>
            <Container>
                <Content>
                    <h1>Novo Nível</h1>
                    <hr />
                    <form onSubmit={handleSubmitQualificationLevel}>
                        <input name="id" hidden disabled placeholder="id" value={id} onChange={({ target }) => setId(Number(target.value))}></input>
                        <input name="level" placeholder="nível" value={level} required onChange={({ target }) => setLevel(target.value)}></input>
                        <button type="submit">Salvar</button>
                    </form> 
                </Content>
            </Container>
        </>
    )
}