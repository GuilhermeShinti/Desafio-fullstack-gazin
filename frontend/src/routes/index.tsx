import { Route, Routes } from 'react-router-dom';
import { FormQualificationLevel } from '../pages/FormQualificationLevel';
import { Home } from '../pages/Home';
import { ListQualificationLevel } from '../pages/ListQualificationLevel';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/levels" element={<ListQualificationLevel />} />
            <Route path="/levels/new" element={<FormQualificationLevel />} />
            <Route path="/levels/:id" element={<FormQualificationLevel />} />
            <Route path="*" element={<>{"404"}</>} />
        </Routes>
    )
}