import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "../../components/Content";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Container } from "./styles";
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

interface IQualificationLevel
{
    id: string;
    level: number;
    totalDevelopers: number;
}

export function ListQualificationLevel() {
    const navigate = useNavigate();
    const [qualificationLevels, setQualificationLevels] = useState<IQualificationLevel[]>([]);

    async function loadQualificationLevels() {
        await api.get('levels').then(response => setQualificationLevels(response.data));
    }

    useEffect(() => {
        loadQualificationLevels();
    }, [])

    async function onClickDeleteQualificationLevel(id: number) {
        const confirmDelete = async function(id: number) {
            try {
                await api.delete(`levels/${id}`);
                loadQualificationLevels();
                toast.success("Nível removido com sucesso.");
            } catch (err: any) {
                toast.error(err.response.data.message);
            }
        }

        confirmAlert({
            title: 'Confirmação',
            message: 'Deseja realmente excluir o desenvolvedor?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {confirmDelete(id)}
                },
                {
                    label: 'Não',
                    onClick: () => {}
                }
            ]
        });
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
                                            <td>{qualification.totalDevelopers}</td>
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