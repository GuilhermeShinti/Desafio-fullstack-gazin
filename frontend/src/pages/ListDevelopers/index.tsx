import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Container, Content } from "./styles";

interface IDevelopers
{
    id: string;
    name: number;
    age: number;
    hobby: number;
}

export function ListDevelopers() {
    const [developers, setDevelopers] = useState<IDevelopers[]>([]);

    async function loadQualificationLevels() {
        await api.get('developers').then(response => setDevelopers(response.data));
    }

    useEffect(() => {
        loadQualificationLevels();
    }, [])

    async function onClickDeleteDeveloper(id: number) {
        await api.delete(`levels/${id}`);
        loadQualificationLevels();
    }


    return (
        <>
            <Header buttonText="Novo Desenvolvedor"  goTo="new"/>
            <Container>
                <Content>             
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>idade</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                developers.map(developer => 
                                    (
                                        <tr key={developer.id}>
                                            <td>{developer.name}</td>
                                            <td>{developer.age}</td>
                                            <td className="actionButtons">
                                                <button className="edit" onClick={() => {}}>Editar</button>
                                                <button className="delete" onClick={() => {onClickDeleteDeveloper(Number(developer.id))}}>Excluir</button>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </Content>
            </Container>
        </>
    );
}