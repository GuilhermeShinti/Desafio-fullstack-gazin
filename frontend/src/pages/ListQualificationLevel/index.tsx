import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Container, Content } from "./styles";

interface IQualificationLevel
{
    id: string;
    level: number;
}

export function ListQualificationLevel() {
    const [qualificationLevels, setQualificationLevels] = useState<IQualificationLevel[]>([]);

    useEffect(() => {
        api.get('levels').then(response => setQualificationLevels(response.data));
    }, [])

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
                                            <td className="actionButtons"><button className="edit">Editar</button><button className="delete">Excluir</button></td>
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