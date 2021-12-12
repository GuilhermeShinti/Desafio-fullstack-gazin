import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "../../components/Content";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Container } from "./styles";
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { roundUp } from "../../utils";

interface IQualificationLevel
{
    id: string;
    level: number;
    totalDevelopers: number;
}

export function ListQualificationLevel() {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [pages, setPages] = useState<number[]>([]);
    const [limit, setLimit] = useState<number>(10);
    const [qualificationLevels, setQualificationLevels] = useState<IQualificationLevel[]>([]);
    const [totalQualification, setTotalQualification] = useState<number>(0);

    async function loadQualificationLevels(paramPage?: number) {
        const currentPage = paramPage || page;
        setPage(currentPage);

        await api.get(`levels?page=${currentPage}&limit=${limit}`).then(response => {
            setQualificationLevels(response.data.data);
            setTotalQualification(response.data.total);
            const totalPages = roundUp(response.data.total / limit, 0);
            setPages(Array.from(Array(totalPages).keys()))
        });
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
                    <ul>
                        {
                            pages.map(pageNumber => 
                                (
                                    <li key={pageNumber} onClick={() => {loadQualificationLevels(pageNumber + 1)}}>{pageNumber + 1}</li>
                                )
                            )
                        }
                    </ul>
                </Content>
            </Container>
        </>
    );
}