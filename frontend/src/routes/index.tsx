import { Route, Routes } from 'react-router-dom';
import { ListQualificationLevel } from '../pages/ListQualificationLevel';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<ListQualificationLevel />}></Route>
            <Route index element={<ListQualificationLevel />}></Route>
            <Route path="/levels" element={<ListQualificationLevel />}></Route>
            <Route path="*" element={<></>} />
        </Routes>
    )
}