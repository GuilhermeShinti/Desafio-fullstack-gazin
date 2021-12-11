import { Route, Routes } from 'react-router-dom';
import { Formdeveloper } from '../pages/FormDeveloper';
import { FormQualificationLevel } from '../pages/FormQualificationLevel';
import { Home } from '../pages/Home';
import { ListDevelopers } from '../pages/ListDevelopers';
import { ListQualificationLevel } from '../pages/ListQualificationLevel';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/levels" element={<ListQualificationLevel />} />
            <Route path="/levels/new" element={<FormQualificationLevel />} />
            <Route path="/levels/:id" element={<FormQualificationLevel />} />
            <Route path="/developers" element={<ListDevelopers />} />
            <Route path="/developers/new" element={<Formdeveloper />} />
            <Route path="/developers/:id" element={<Formdeveloper />} />
            <Route path="*" element={<>{"404"}</>} />
        </Routes>
    )
}