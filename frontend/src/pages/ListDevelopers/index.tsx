import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "../../components/Content";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Container } from "./styles";

interface IQualificationLevel
{
    id: string;
    level: number;
}

interface IDevelopers
{
    id: string;
    name: number;
    age: number;
    hobby: number;
    gender: string;
    birthdate: string;
    qualificationLevelId: number;
    qualificationLevel: IQualificationLevel;
}

export function ListDevelopers() {
    const navigate = useNavigate();
    const [developers, setDevelopers] = useState<IDevelopers[]>([]);

    async function loadDevelopers() {
        await api.get('developers').then(response => setDevelopers(response.data));
    }

    useEffect(() => {
        loadDevelopers();
    }, [])

    async function onClickDeleteDeveloper(id: number) {
        await api.delete(`developers/${id}`);
        loadDevelopers();
    }

    async function onClickEditDeveloper(developer: IDevelopers) {
        navigate(`/developers/${developer.id}`, {
            state: {
                idState: developer.id,
                nameState: developer.name,
                qualificationState: developer.qualificationLevelId,
                birthdateState: developer.birthdate,
                genderState: developer.gender,
                hobbyState: developer.hobby
            }
        })
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
                                <th>Idade</th>
                                <th>Nível</th>
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
                                            <td>{developer.qualificationLevel && developer.qualificationLevel.level}</td>
                                            <td className="actionButtons">
                                                <button className="edit" onClick={() => {onClickEditDeveloper(developer)}}>Editar</button>
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