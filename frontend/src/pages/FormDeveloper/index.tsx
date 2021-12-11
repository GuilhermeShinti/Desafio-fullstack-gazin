import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Content } from "../../components/Content";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Container } from "./styles";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';

import "react-datepicker/dist/react-datepicker.css";

interface IQualificationLevel
{
    id: string;
    level: number;
}

export function Formdeveloper() {
    const navigate = useNavigate();
    const location = useLocation();
    const { 
        idState, 
        qualificationState, 
        nameState, 
        birthdateState,
        genderState,
        hobbyState
    } = location.state || {};

    const [id, setId] = useState<number>(idState ? Number(idState) : 0);
    const [qualificationLevelId, setQualificationLevelId] = useState<string>(qualificationState ? qualificationState : '0');
    const [name, setName] = useState<string>(nameState ? nameState : "");
    const [birthdate, setBirthdate] = useState<Date>(birthdateState ? new Date(birthdateState) : new Date());
    const [gender, setGender] = useState<string>(genderState ? genderState : "");
    const [hobby, setHobby] = useState<string>(hobbyState ? hobbyState : "");
    const [qualificationLevels, setQualificationLevels] = useState<IQualificationLevel[]>([]);

    async function loadQualificationLevels() {
        await api.get('levels').then(response => setQualificationLevels(response.data));
    }

    useEffect(() => {
        loadQualificationLevels();
    }, [])

    async function handleSubmitDeveloper(event: FormEvent) {
        event.preventDefault();

        const developer = { id, name, qualificationLevelId, birthdate, gender, hobby};
        const isNew = (id === 0);

        try {    
            if (isNew) {
                await api.post('developers', developer);
                toast.success("Desenvolvedor criado com sucesso.");
            } else {
                await api.put(`developers/${id}`, developer);
                toast.success("Desenvolvedor editado com sucesso.");
            }
    
            navigate("/developers");
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
        
        
    }

    return (
        <>
            <Header buttonText="Voltar" goTo="/developers"/>
            <Container>
                <Content>
                    <h1>Novo Desenvolvedor</h1>
                    <hr />
                    <form onSubmit={handleSubmitDeveloper}>
                        <input name="id" hidden disabled placeholder="id" value={id} onChange={({ target }) => setId(Number(target.value))}></input>
                        <select required value={qualificationLevelId} onChange={({target}) => setQualificationLevelId(target.value)}>
                            <option value="0" disabled selected>Nível</option>
                            {
                                qualificationLevels.map(
                                    qualification => (
                                        <option key={qualification.id} value={qualification.id}>{qualification.level}</option>
                                    )
                                )
                            }
                        </select>
                        <input name="name" placeholder="Nome" value={name} required onChange={({ target }) => setName(target.value)}></input>
                        <DatePicker selected={birthdate} onChange={(date) => {setBirthdate(date as Date)}} dateFormat="dd/MM/yyyy" />
                        <select required value={gender}  onChange={({target}) => setGender(target.value)}>
                            <option value="" disabled selected>Sexo</option>
                            <option value="F">Feminino</option>
                            <option value="M">Masculino</option>
                            <option value="O">Outros</option>
                        </select>
                        <input name="hobby" placeholder="Hobby" value={hobby} required onChange={({ target }) => setHobby(target.value)}></input>
                        <button type="submit" className="submit">Salvar</button>
                    </form> 
                </Content>
            </Container>
        </>
    )
}