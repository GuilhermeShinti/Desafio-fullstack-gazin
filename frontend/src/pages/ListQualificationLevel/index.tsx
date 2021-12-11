import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Container, Content } from "./styles";

interface IQualificationLevel
{
    id: string;
    level: number;
}

export function ListQualificationLevel() {
    let navigate = useNavigate();
    const [qualificationLevels, setQualificationLevels] = useState<IQualificationLevel[]>([]);

    async function loadQualificationLevels() {
        await api.get('levels').then(response => setQualificationLevels(response.data));
    }

    useEffect(() => {
        loadQualificationLevels();
    }, [])

    async function onClickDeleteQualificationLevel(id: number) {
        await api.delete(`levels/${id}`);
        loadQualificationLevels();
    }

    async function onClickEditQualificationLevel(qualification: IQualificationLevel) {
        navigate(`/levels/${qualification.id}`, {
            state: {
                idState: qualification.id,
                levelState: qualification.level,
            }
        })
    }


    return (
        <>
            <Header buttonText="Novo Nível"  goTo="new"/>
            <Container>
                <Content>             
                    <table>
                        <thead>
                            <tr>
                                <th>Nível</th>
                                <th>Desenvolvedores</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                qualificationLevels.map(qualification => 
                                    (
                                        <tr key={qualification.id}>
                                            <td>{qualification.level}</td>
                                            <td>1</td>
                                            <td className="actionButtons">
                                                <button className="edit" onClick={() => {onClickEditQualificationLevel(qualification)}}>Editar</button>
                                                <button className="delete" onClick={() => {onClickDeleteQualificationLevel(Number(qualification.id))}}>Excluir</button>
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