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
    const [page, setPage] = useState<number>(1);
    const [pages, setPages] = useState<number[]>([]);
    const [limit, setLimit] = useState<number>(10);
    const [developers, setDevelopers] = useState<IDevelopers[]>([]);
    const [totalDevelopers, setTotalDevelopers] = useState<number>(0);

    async function loadDevelopers(paramPage?: number) {
        const currentPage = paramPage || page;
        setPage(currentPage);

        await api.get(`developers?page=${currentPage}&limit=${limit}`).then(response => {
            setDevelopers(response.data.data);
            setTotalDevelopers(response.data.total);
            const totalPages = roundUp(response.data.total / limit, 0);
            setPages(Array.from(Array(totalPages).keys()))
        });
    }

    useEffect(() => {
        loadDevelopers();
    }, [])

    async function onClickDeleteDeveloper(id: number) {

        const confirmDelete = async function(id: number) {
            try {
                await api.delete(`developers/${id}`);
                loadDevelopers();
                toast.success("Desenvolvedor removido com sucesso.");
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
                    <ul>
                        {
                            pages.map(pageNumber => 
                                (
                                    <li key={pageNumber} onClick={() => {loadDevelopers(pageNumber + 1)}}>{pageNumber + 1}</li>
                                )
                            )
                        }
                    </ul>
                </Content>
            </Container>
        </>
    );
}